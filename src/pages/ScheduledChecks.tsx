import { MainLayout } from "@/components/layout/MainLayout";
import ProductApiForm from "@/components/others/ProductApiForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, Play, Plus, Settings, Trash } from "lucide-react";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserProductAPIs } from "@/services/product-api";
import { useToast } from "@/hooks/use-toast";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

export default function ScheduledChecks() {
  const { currentUser } = getAuth();
  const {
    isPending,
    isLoading,
    error,
    refetch,
    data: productApis,
  } = useQuery({
    queryKey: ["product-apis"],
    queryFn: async () => getUserProductAPIs(currentUser.uid),
    retry: false,
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState<null | string>(null);
  const [isDeleteAction, setIsDeleteAction] = useState(false);
  const toast = useToast();

  const controlledProductApiTest = async (productApi) => {
    setActionLoading(productApi.productAPIId);
    const { currentUser } = getAuth();

    try {
      if (!currentUser || !currentUser.uid)
        throw new Error("Please log in first");
      const resp = await fetch("http://localhost:6575/api-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          testName: `${productApi.productName} Manual Test`,
          targetUrl: productApi.targetUrl,
          openAPISpecPath: productApi.openAPISpecPath,
          productAPIId: productApi.productAPIId,
        }),
      });
      const respData = (await resp.json()) as unknown as {
        success: boolean;
        message: string;
      };
      if (!respData.success) throw new Error(respData.message);
      toast.toast({
        title: "Success",
        description: respData.message,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);
    }
  };
  const deleteProductApi = async (productApi) => {
    setActionLoading(productApi);
    setIsDeleteAction(true);
    try {
      await deleteDoc(doc(getFirestore(), "productAPIs", productApi));
      await refetch();
      toast.toast({
        title: "Success",
        description: "Product API deleted successfully",
        variant: "default",
      });
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setActionLoading(null);

      setIsDeleteAction(true);
    }
  };

  return (
    <MainLayout>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Saved APIs</CardTitle>
            <div className="flex items-center gap-2">
              <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogTrigger className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Save new Product API
                </DialogTrigger>
                <ProductApiForm
                  onClose={async () => {
                    await refetch();
                    setOpenDialog(false);
                  }}
                />
              </Dialog>
            </div>
          </div>
          <CardDescription>
            Currently saved APIs & their security checks status
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPending || isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error.message}</div>
          ) : productApis.length === 0 ? (
            <div className="text-muted-foreground text-center py-4">
              No saved APIs found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {/* <TableHead>Frequency</TableHead> */}
                  {/* <TableHead>Next Run</TableHead> */}
                  {/* <TableHead>Last Run</TableHead> */}
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productApis.map((productApi) => (
                  <TableRow key={productApi.productAPIId}>
                    <TableCell className="font-medium">
                      {productApi.productName}
                    </TableCell>
                    {/* <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{test.frequency}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>{test.nextRun}</span>
                    </div>
                  </TableCell> */}
                    {/* <TableCell>{test.lastRun}</TableCell> */}
                    <TableCell>
                      <StatusBadge status="success">Active</StatusBadge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => controlledProductApiTest(productApi)}
                          disabled={actionLoading != null}
                        >
                          {actionLoading === productApi.productAPIId &&
                          !isDeleteAction ? (
                            "Testing..."
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        {/* <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button> */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            deleteProductApi(productApi.productAPIId)
                          }
                          disabled={actionLoading != null}
                        >
                          {actionLoading === productApi.productAPIId &&
                          isDeleteAction ? (
                            "Deleting..."
                          ) : (
                            <Trash className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Schedule Configuration</CardTitle>
            <CardDescription>
              Configure default settings for scheduled checks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              These settings will apply to all new scheduled checks unless overridden.
            </p>
            <div className="space-y-2">
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="font-medium">Default Scan Depth</p>
                <p className="text-sm text-muted-foreground">Comprehensive (All security tests enabled)</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="font-medium">Notification Settings</p>
                <p className="text-sm text-muted-foreground">Email alerts for critical and high vulnerabilities</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="font-medium">Retry Configuration</p>
                <p className="text-sm text-muted-foreground">3 attempts with 5 minute intervals</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="font-medium">Concurrent Scans</p>
                <p className="text-sm text-muted-foreground">Maximum 5 concurrent scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Schedule Statistics</CardTitle>
            <CardDescription>
              Overview of your scheduled scanning activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="text-2xl font-bold">24</p>
                <p className="text-sm text-muted-foreground">Total Schedules</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="text-2xl font-bold">18</p>
                <p className="text-sm text-muted-foreground">Active Schedules</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="text-2xl font-bold">142</p>
                <p className="text-sm text-muted-foreground">Scans This Month</p>
              </div>
              <div className="bg-secondary/30 rounded-md p-3">
                <p className="text-2xl font-bold">37</p>
                <p className="text-sm text-muted-foreground">Issues Detected</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              View Detailed Analytics
            </Button>
          </CardContent>
        </Card>
      </div> */}
    </MainLayout>
  );
}
