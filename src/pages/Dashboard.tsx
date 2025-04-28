import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/ui/stat-card";
import { VulnerabilityChart } from "@/components/dashboard/VulnerabilityChart";
import { Badge } from "@/components/ui/badge";
import {
  ShieldAlert,
  Clock,
  Calendar,
  CheckSquare,
  AlertCircle,
} from "lucide-react";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const recentScans = [
  {
    id: 1,
    api: "Payment Gateway API",
    timestamp: "10 minutes ago",
    status: "success",
    findings: 0,
  },
  {
    id: 2,
    api: "User Authentication API",
    timestamp: "2 hours ago",
    status: "warning",
    findings: 3,
  },
  {
    id: 3,
    api: "Data Export API",
    timestamp: "4 hours ago",
    status: "error",
    findings: 7,
  },
  {
    id: 4,
    api: "Product Catalog API",
    timestamp: "Yesterday",
    status: "success",
    findings: 0,
  },
];

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to API Sentinel - An Automated API Security and Penetration
            Testing Platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-card text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Last update: 10 minutes ago
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total APIs Monitored"
          value="24"
          description="Across 5 applications"
          icon={<ShieldAlert className="h-4 w-4" />}
          // trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Active Vulnerabilities"
          value="-"
          description="- critical, - high"
          icon={<AlertCircle className="h-4 w-4" />}
          trend={{ value: 0, isPositive: false }}
        />
        <StatCard
          title="Scheduled Scans"
          value="-"
          description="Next scan in - hours"
          icon={<Calendar className="h-4 w-4" />}
        />
        <StatCard
          title="Fixed Issues"
          value="-"
          description="Last 30 days"
          icon={<CheckSquare className="h-4 w-4" />}
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <VulnerabilityChart />

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>
                Latest API security scans and results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="flex items-center justify-between p-3 bg-secondary/30 rounded-md"
                  >
                    <div>
                      <p className="font-medium">{scan.api}</p>
                      <p className="text-xs text-muted-foreground">
                        {scan.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge
                        status={
                          scan.status as
                            | "success"
                            | "warning"
                            | "error"
                            | "info"
                        }
                      >
                        {scan.status === "success"
                          ? "Secure"
                          : scan.status === "warning"
                          ? "Warnings"
                          : "Vulnerabilities"}
                      </StatusBadge>
                      {scan.findings > 0 ? (
                        <Badge variant="outline" className="bg-card">
                          {scan.findings}{" "}
                          {scan.findings === 1 ? "issue" : "issues"}
                        </Badge>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
