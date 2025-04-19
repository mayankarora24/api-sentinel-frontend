
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Clock, Play, Plus, Settings, Trash } from "lucide-react";

const scheduledTests = [
  {
    id: 1,
    name: "Payment Gateway API",
    frequency: "Daily",
    nextRun: "Today, 9:00 PM",
    lastRun: "Yesterday, 9:00 PM",
    status: "active"
  },
  {
    id: 2,
    name: "User Authentication API",
    frequency: "Weekly",
    nextRun: "Wed, 12:00 AM",
    lastRun: "Last week",
    status: "active"
  },
  {
    id: 3,
    name: "Data Export API",
    frequency: "Daily",
    nextRun: "Today, 10:30 PM",
    lastRun: "Yesterday, 10:30 PM",
    status: "paused"
  },
  {
    id: 4,
    name: "Product Catalog API",
    frequency: "Hourly",
    nextRun: "Today, 4:00 PM",
    lastRun: "Today, 3:00 PM",
    status: "active"
  },
  {
    id: 5,
    name: "Analytics API",
    frequency: "Weekly",
    nextRun: "Sun, 12:00 AM",
    lastRun: "Last week",
    status: "active"
  }
];

export default function ScheduledChecks() {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Scheduled Checks</h1>
          <p className="text-muted-foreground">Manage your scheduled API security checks</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Schedule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Schedules</CardTitle>
          <CardDescription>
            Currently scheduled API security checks and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scheduledTests.map((test) => (
                <TableRow key={test.id}>
                  <TableCell className="font-medium">{test.name}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>{test.lastRun}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={test.status === "active" ? "success" : "warning"}
                    >
                      {test.status === "active" ? "Active" : "Paused"}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </MainLayout>
  );
}
