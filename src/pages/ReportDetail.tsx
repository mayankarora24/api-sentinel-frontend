import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, File, Link2 } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { getReport } from "@/services/reports";
import { useQuery } from "@tanstack/react-query";

const getRiskText = (riskcode) => {
  switch (String(riskcode)) {
    case "3":
      return "high";
    case "2":
      return "medium";
    case "1":
      return "low";
    case "0":
      return "informational";
    case "-1":
      return "falsePositive";
    default:
      return "Unknown";
  }
};

const getHost = (siteInfo) =>
  `${siteInfo["@ssl"] === "true" ? "https://" : "http://"}${
    siteInfo["@host"]
  }:${siteInfo["@port"]}`;

// // Mock data for a report
// const vulnerabilities = ReportData.site[0].alerts.map((alert) => ({
//   id: alert.pluginid,
//   title: alert.name,
//   description: alert.desc,
//   severity: getRiskText(alert.riskcode),
//   totalInstances: alert.count,
// }));

export default function ReportDetail() {
  // In a real app, we would use route params to get the report ID
  const params = useParams();
  const [testReportData, setTestReportData] = useState(null);
  const {
    isPending,
    isLoading,
    error,
    data: reportData,
  } = useQuery({
    queryKey: ["report", params.id],
    queryFn: async () => getReport(params.id),
    retry: false,
  });
  useEffect(() => {
    if (reportData) {
      console.log(reportData);
      setTestReportData(JSON.parse(reportData.jsonReport));
    }
  }, [isPending, isLoading, reportData]);
  const alerts = useMemo(() => {
    if (!testReportData) return {};
    const reportAlerts = testReportData.site[0].alerts;
    if (!reportAlerts) return {};
    return {
      totalAlert: reportAlerts.length,
      critical: reportAlerts.filter((a) => a.riskcode === "4").length,
      high: reportAlerts.filter((a) => a.riskcode === "3").length,
      medium: reportAlerts.filter((a) => a.riskcode === "2").length,
      low: reportAlerts.filter((a) => a.riskcode === "1").length,
      alertsArr: reportAlerts,
    };
  }, [testReportData]);
  const vulnerabilities = useMemo(() => {
    if (!testReportData) return [];
    const reportAlerts = testReportData.site[0]?.alerts;
    if (!reportAlerts) return [];
    return reportAlerts.map((alert) => ({
      id: alert.pluginid,
      title: alert.name,
      description: alert.desc,
      severity: getRiskText(alert.riskcode),
      totalInstances: alert.count,
    }));
  }, [testReportData]);

  if (isPending || isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !reportData) {
    return <div>Error: {error?.message}</div>;
  }

  console.log(testReportData);

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
      {testReportData && reportData && (
        <>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold">{reportData.reportName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <p className="text-muted-foreground">
                  Generated on {testReportData["@generated"]}
                </p>
                <Badge variant="outline">ID: REP-{params.id}</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
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
              <CardContent className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-5xl font-bold text-status-error">
                    {alerts.totalAlert}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Total Vulnerabilities
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Severity Breakdown
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Critical</p>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                        <div
                          className="bg-status-error h-full rounded-full"
                          style={{
                            width: `${
                              (alerts.critical / alerts.totalAlert) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">{alerts.critical}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">High</p>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                        <div
                          className="bg-status-warning h-full rounded-full"
                          style={{
                            width: `${
                              (alerts.high / alerts.totalAlert) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">{alerts.high}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Medium</p>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                        <div
                          className="bg-status-info h-full rounded-full"
                          style={{
                            width: `${
                              (alerts.medium / alerts.totalAlert) * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">{alerts.medium}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-medium">Low</p>
                    <div className="flex items-center">
                      <div className="w-32 h-2 bg-secondary overflow-hidden rounded-full mr-2">
                        <div
                          className="bg-status-success h-full rounded-full"
                          style={{
                            width: `${(alerts.low / alerts.totalAlert) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">{alerts.low}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* <div>
                    <p className="text-sm text-muted-foreground">
                      API Information
                    </p>
                    <p className="font-medium">Payment Gateway API v2.0</p>
                  </div> */}
                  <div>
                    <p className="text-sm text-muted-foreground">Base URL</p>
                    <div className="flex items-center gap-1">
                      <Link2 className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs font-mono">
                        {getHost(testReportData.site[0])}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Test Duration
                    </p>
                    <p className="font-medium">12 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* <Card className="mb-6">
        <CardHeader>
          <CardTitle>Summary</CardTitle>
          <CardDescription>
            Overview of the security assessment findings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            The security assessment of the Payment Gateway API uncovered several
            vulnerabilities that require immediate attention. Most critically,
            there is a SQL injection vulnerability in the user endpoint that
            could potentially allow unauthorized data access. Additionally, the
            authentication endpoints lack proper rate limiting, making them
            susceptible to brute force attacks. We recommend implementing the
            suggested fixes at your earliest convenience to mitigate these
            security risks.
          </p>

          <div className="bg-primary/5 border border-primary/20 rounded-md p-4 mt-4">
            <h3 className="font-medium mb-2">Risk Assessment</h3>
            <p className="text-sm">
              Overall risk level:{" "}
              <span className="font-medium text-status-error">High</span>
            </p>
            <p className="text-sm mt-2">
              The identified vulnerabilities could potentially lead to
              unauthorized data access, account takeover, and potential data
              breaches if exploited.
            </p>
          </div>
        </CardContent>
      </Card> */}

          <Card>
            <CardHeader>
              <CardTitle>Detected Vulnerabilities</CardTitle>
              <CardDescription>
                Detailed list of security issues found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vulnerability</TableHead>
                    <TableHead className="text-nowrap">
                      Total Instances
                    </TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead className="w-[400px]">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vulnerabilities.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.title}
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {item.totalInstances}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            item.severity === "critical"
                              ? "error"
                              : item.severity === "high"
                              ? "warning"
                              : item.severity === "medium"
                              ? "info"
                              : "success"
                          }
                        >
                          {item.severity.charAt(0).toUpperCase() +
                            item.severity.slice(1)}
                        </StatusBadge>
                      </TableCell>
                      <TableCell
                        className="text-sm"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between border-t px-6 py-4">
              <p className="text-sm text-muted-foreground">
                Showing Common Vulnerabilities
              </p>
              {/* <Button variant="outline" size="sm">
            View All Issues
          </Button> */}
            </CardFooter>
          </Card>
        </>
      )}
    </MainLayout>
  );
}
