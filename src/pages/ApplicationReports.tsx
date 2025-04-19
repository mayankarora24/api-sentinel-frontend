
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// Mock data for different applications
const applications = [
  {
    id: "app1",
    name: "Payment Gateway",
    description: "APIs for processing payments",
    apiCount: 8,
    reports: [
      { id: 1, name: "Weekly Security Scan", date: "Today", status: "error", findings: 7 },
      { id: 2, name: "PCI DSS Compliance Check", date: "5 days ago", status: "warning", findings: 3 },
    ]
  },
  {
    id: "app2",
    name: "User Management",
    description: "APIs for user registration and profile management",
    apiCount: 12,
    reports: [
      { id: 3, name: "Weekly Security Scan", date: "Yesterday", status: "warning", findings: 5 },
      { id: 4, name: "OAuth Implementation Review", date: "1 week ago", status: "success", findings: 1 },
    ]
  },
  {
    id: "app3",
    name: "Product Catalog",
    description: "APIs for product listing and inventory",
    apiCount: 6,
    reports: [
      { id: 5, name: "Weekly Security Scan", date: "3 days ago", status: "success", findings: 0 },
      { id: 6, name: "Performance & Security Audit", date: "2 weeks ago", status: "info", findings: 2 },
    ]
  }
];

export default function ApplicationReports() {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Application Reports</h1>
        <p className="text-muted-foreground">View reports grouped by application</p>
      </div>

      <Tabs defaultValue="app1" className="w-full">
        <TabsList className="w-full mb-6 flex flex-wrap h-auto gap-2 justify-start bg-transparent p-0">
          {applications.map(app => (
            <TabsTrigger 
              key={app.id} 
              value={app.id}
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2"
            >
              {app.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {applications.map(app => (
          <TabsContent key={app.id} value={app.id} className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>{app.name}</CardTitle>
                  <CardDescription>{app.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">API Endpoints:</span>
                      <span className="font-medium">{app.apiCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Last Scan:</span>
                      <span className="font-medium">
                        {app.reports[0]?.date || "Never"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Security Status:</span>
                      <StatusBadge 
                        status={app.reports[0]?.status as "success" | "warning" | "error" | "info" || "info"}
                      >
                        {app.reports[0]?.status === "success" ? "Secure" : 
                         app.reports[0]?.status === "warning" ? "Warnings" : 
                         app.reports[0]?.status === "error" ? "Critical" : "Unknown"}
                      </StatusBadge>
                    </div>
                  </div>
                  <Button className="w-full mt-6" variant="outline">
                    Run New Scan
                  </Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Security Reports</CardTitle>
                  <CardDescription>Past security reports for {app.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {app.reports.map(report => (
                      <Link
                        key={report.id}
                        to={`/reports/${report.id}`}
                        className="flex items-center justify-between p-3 rounded-md bg-secondary/30 hover:bg-secondary/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-xs text-muted-foreground">{report.date}</p>
                        </div>
                        <div className="text-right">
                          <StatusBadge status={report.status as "success" | "warning" | "error" | "info"}>
                            {report.findings} {report.findings === 1 ? "issue" : "issues"}
                          </StatusBadge>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Coverage</CardTitle>
                <CardDescription>Security coverage for {app.name} APIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                  API coverage visualization would appear here.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </MainLayout>
  );
}
