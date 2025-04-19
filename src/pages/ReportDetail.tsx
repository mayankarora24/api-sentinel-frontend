
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, File, Link2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

// Mock data for a report
const vulnerabilities = [
  {
    id: 1,
    title: "SQL Injection Vulnerability",
    endpoint: "/api/v1/users",
    severity: "critical",
    description: "The endpoint is vulnerable to SQL injection attacks through the 'search' parameter."
  },
  {
    id: 2,
    title: "Missing Rate Limiting",
    endpoint: "/api/v1/auth/login",
    severity: "high",
    description: "No rate limiting detected on authentication endpoint, making it vulnerable to brute force attacks."
  },
  {
    id: 3,
    title: "Insecure Authorization",
    endpoint: "/api/v1/orders",
    severity: "high",
    description: "API doesn't properly verify ownership before returning order information."
  },
  {
    id: 4,
    title: "Excessive Data Exposure",
    endpoint: "/api/v1/users/profile",
    severity: "medium",
    description: "API returns sensitive user data that shouldn't be exposed."
  },
  {
    id: 5,
    title: "Missing Content Security Policy",
    endpoint: "global",
    severity: "low",
    description: "No Content-Security-Policy header detected in API responses."
  }
];

export default function ReportDetail() {
  // In a real app, we would use route params to get the report ID
  const location = useLocation();
  
  return (
    <MainLayout>
      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/reports">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Reports
          </Link>
        </Button>
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Gateway API Security Report</h1>
          <div className="flex items-center gap-2 mt-2">
            <p className="text-muted-foreground">Generated on April 18, 2025, 09:30 AM</p>
            <Badge variant="outline">ID: REP-2025041801</Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <File className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-5xl font-bold text-status-error">7</p>
              <p className="text-sm text-muted-foreground mt-2">Total Vulnerabilities</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Severity Breakdown</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Critical</p>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                    <div className="bg-status-error h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-xs">1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">High</p>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                    <div className="bg-status-warning h-full rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-xs">2</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Medium</p>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                    <div className="bg-status-info h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-xs">1</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium">Low</p>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                    <div className="bg-status-success h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-xs">3</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">API Information</p>
                <p className="font-medium">Payment Gateway API v2.0</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Base URL</p>
                <div className="flex items-center gap-1">
                  <Link2 className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs font-mono">https://api.example.com/v2/payments</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Test Duration</p>
                <p className="font-medium">12 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>Overview of the security assessment findings</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            The security assessment of the Payment Gateway API uncovered several vulnerabilities 
            that require immediate attention. Most critically, there is a SQL injection vulnerability 
            in the user endpoint that could potentially allow unauthorized data access. Additionally, 
            the authentication endpoints lack proper rate limiting, making them susceptible to brute 
            force attacks. We recommend implementing the suggested fixes at your earliest convenience 
            to mitigate these security risks.
          </p>
          
          <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mt-4">
            <h3 className="font-medium mb-2">Risk Assessment</h3>
            <p className="text-sm">
              Overall risk level: <span className="font-medium text-status-error">High</span>
            </p>
            <p className="text-sm mt-2">
              The identified vulnerabilities could potentially lead to unauthorized data access, 
              account takeover, and potential data breaches if exploited.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detected Vulnerabilities</CardTitle>
          <CardDescription>Detailed list of security issues found</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vulnerability</TableHead>
                <TableHead>Endpoint</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead className="w-[300px]">Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vulnerabilities.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell className="font-mono text-xs">{item.endpoint}</TableCell>
                  <TableCell>
                    <StatusBadge 
                      status={
                        item.severity === "critical" ? "error" : 
                        item.severity === "high" ? "warning" : 
                        item.severity === "medium" ? "info" : "success"
                      }
                    >
                      {item.severity.charAt(0).toUpperCase() + item.severity.slice(1)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell className="text-sm">{item.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <p className="text-sm text-muted-foreground">Showing 5 of 7 vulnerabilities</p>
          <Button variant="outline" size="sm">View All Issues</Button>
        </CardFooter>
      </Card>
    </MainLayout>
  );
}
