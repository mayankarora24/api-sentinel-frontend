import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import ReportDetail from "./ReportDetail";
import { getAuth } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { getUserApiTests } from "@/services/api-tests";
import { Link } from "react-router-dom";

function TestHistories() {
  const { currentUser } = getAuth();
  const {
    isPending,
    isLoading,
    error,
    data: tests,
  } = useQuery({
    queryKey: ["api-tests"],
    queryFn: async () => getUserApiTests(currentUser.uid),
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test History</CardTitle>
        <CardDescription>
          History of previous API security tests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {tests && tests.length ? (
          <div>
            {tests.map((test) => (
              <Link
                to={`/reports/${test.reportId}`}
                key={test.testId}
                className="p-4 rounded-md bg-card border flex items-center justify-between hover:bg-secondary/20 transition-colors mb-3 cursor-pointer"
              >
                <div>
                  <h3 className="font-medium">{test.testName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {test.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {/* {report.findings} findings */}
                    </p>
                    {/* <StatusBadge
                      status={
                        report.status as
                          | "success"
                          | "warning"
                          | "error"
                          | "info"
                      }
                    >
                      {report.status === "success"
                        ? "Safe"
                        : report.status === "warning"
                        ? "Warnings"
                        : "Critical"}
                    </StatusBadge> */}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground p-8">
            {isLoading && "Loading..."}
            {!error && (!tests || tests.length === 0) && "No tests found"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ApiTests() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<null | { success: boolean }>(
    null
  );
  const [testName, setTestName] = useState("");
  const [targetUrl, setEndpoint] = useState("");
  const [openAPISpecPath, setOpenAPISpecPath] = useState("");

  const [error, setError] = useState<null | string>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    const { currentUser } = getAuth();

    try {
      if (!currentUser || !currentUser.uid)
        throw new Error("Please log in first");
      if (!targetUrl || !openAPISpecPath)
        throw new Error("Please fill in all fields");
      const resp = await fetch("http://localhost:6575/api-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: currentUser.uid,
          testName,
          targetUrl: targetUrl,
          openAPISpecPath: openAPISpecPath,
        }),
      });
      const respData = (await resp.json()) as unknown as {
        success: boolean;
        message: string;
      };
      if (!respData.success) throw new Error(respData.message);

      setTestResults(respData);
    } catch (error) {
      console.log(error);
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">API Testing</h1>
        <p className="text-muted-foreground">
          Test your APIs for security vulnerabilities
        </p>
      </div>

      <Tabs defaultValue="ondemand" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="ondemand">On-Demand Testing</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="ondemand" className="mt-6">
          {testResults && (
            <Card className=" border-green-500 lg:col-span-4 mb-4">
              <CardHeader className="bg-green-500/10">
                <CardTitle className="text-green-600">
                  Test Completed Successfully
                </CardTitle>
                <CardDescription>
                  The API test has completed. View the detailed report below.
                </CardDescription>
              </CardHeader>
            </Card>
          )}
          {error && (
            <Card className=" border-red-500 lg:col-span-4 mb-4">
              <CardHeader className="bg-red-500/10">
                <CardTitle className="text-red-600">Test Failed</CardTitle>
                <CardDescription>{error}</CardDescription>
              </CardHeader>
            </Card>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* <div>
              <Card>
                <CardHeader>
                  <CardTitle>Test Configuration</CardTitle>
                  <CardDescription>
                    Save or load test configurations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Save Configuration
                    </Button>
                    <Button variant="outline" className="w-full">
                      Load Configuration
                    </Button>
                    <Button variant="outline" className="w-full">
                      Clear Form
                    </Button>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-medium mb-3">Saved Configurations</h3>
                    <ul className="space-y-2">
                      <li className="text-sm p-2 bg-secondary/30 rounded-md">
                        Payment API Basic Test
                      </li>
                      <li className="text-sm p-2 bg-secondary/30 rounded-md">
                        User Authentication Test Suite
                      </li>
                      <li className="text-sm p-2 bg-secondary/30 rounded-md">
                        Data Export API Testing
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div> */}

            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>New API Test</CardTitle>
                  <CardDescription>
                    Configure and run a security test for your API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Test Name</Label>
                        <Input
                          id="name"
                          placeholder="Payment API Security Test"
                          value={testName}
                          onChange={(e) => setTestName(e.target.value)}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="targetUrl">Target URL</Label>
                        <Input
                          id="targetUrl"
                          placeholder="https://api.example.com"
                          value={targetUrl}
                          onChange={(e) => setEndpoint(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="openApiSpec">
                          OPENAPI spec endpoint
                        </Label>
                        <Input
                          id="openApiSpec"
                          placeholder="/apispec_1.json"
                          value={openAPISpecPath}
                          onChange={(e) => setOpenAPISpecPath(e.target.value)}
                          required
                        />
                      </div>
                      {/*                       
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="method">HTTP Method</Label>
                          <Select defaultValue="GET">
                            <SelectTrigger id="method">
                              <SelectValue placeholder="GET" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="GET">GET</SelectItem>
                              <SelectItem value="POST">POST</SelectItem>
                              <SelectItem value="PUT">PUT</SelectItem>
                              <SelectItem value="DELETE">DELETE</SelectItem>
                              <SelectItem value="PATCH">PATCH</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="auth">Authentication Type</Label>
                          <Select defaultValue="none">
                            <SelectTrigger id="auth">
                              <SelectValue placeholder="None" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="basic">Basic Auth</SelectItem>
                              <SelectItem value="bearer">Bearer Token</SelectItem>
                              <SelectItem value="apikey">API Key</SelectItem>
                              <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div> */}

                      <div>
                        <Label htmlFor="headers">Headers (JSON format)</Label>
                        <Textarea
                          id="headers"
                          placeholder='{"Content-Type": "application/json", "Accept": "application/json"}'
                          className="font-mono text-sm"
                        />
                      </div>

                      <div>
                        <Label htmlFor="body">Request Body (optional)</Label>
                        <Textarea
                          id="body"
                          placeholder='{"key": "value"}'
                          className="font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* <div className="space-y-4 pt-4 border-t">
                      <h3 className="font-medium">Test Options</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="injection">SQL Injection Test</Label>
                          <p className="text-xs text-muted-foreground">
                            Test for SQL injection vulnerabilities
                          </p>
                        </div>
                        <Switch id="injection" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="xss">
                            Cross-Site Scripting (XSS) Test
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Test for XSS vulnerabilities in responses
                          </p>
                        </div>
                        <Switch id="xss" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="headers-sec">
                            Headers Security Check
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Verify security headers are properly configured
                          </p>
                        </div>
                        <Switch id="headers-sec" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auth-test">
                            Authentication Bypass Test
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            Test for authentication bypass vulnerabilities
                          </p>
                        </div>
                        <Switch id="auth-test" defaultChecked />
                      </div>
                    </div> */}

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Running Tests..." : "Run Security Test"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <TestHistories />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
