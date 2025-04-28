import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { getAuth } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import {
  getApiTestsReportsForUserUsingProductAPI,
  getUserProductAPIs,
} from "@/services/product-api";

const vulnerabilityData = [
  { name: "Payment API", critical: 2, high: 5, medium: 8, low: 12 },
  { name: "User Auth", critical: 3, high: 7, medium: 5, low: 9 },
  { name: "Data API", critical: 1, high: 3, medium: 12, low: 15 },
  { name: "Product API", critical: 0, high: 2, medium: 6, low: 8 },
  { name: "Analytics", critical: 0, high: 0, medium: 3, low: 7 },
];

const trendData = [
  { name: "Week 1", vulnerabilities: 42 },
  { name: "Week 2", vulnerabilities: 38 },
  { name: "Week 3", vulnerabilities: 29 },
  { name: "Week 4", vulnerabilities: 23 },
  { name: "Week 5", vulnerabilities: 25 },
  { name: "Week 6", vulnerabilities: 18 },
];

const severityData = [
  { name: "Critical", value: 6, color: "#EF4444" },
  { name: "High", value: 17, color: "#F59E0B" },
  { name: "Medium", value: 34, color: "#3B82F6" },
  { name: "Low", value: 51, color: "#10B981" },
];

function ProductAPiTestingReports({ productAPIId }) {
  const {
    isPending,
    isLoading,
    error,
    data: productApiReports,
  } = useQuery({
    queryKey: ["product-apis-reports", productAPIId],
    queryFn: async () => getApiTestsReportsForUserUsingProductAPI(productAPIId),
    retry: false,
  });
  return (
    <>
      {isPending || isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : productApiReports.length === 0 ? (
        <div className="text-muted-foreground text-center py-4">
          No reports found
        </div>
      ) : (
        <div className="space-y-4">
          {productApiReports.map((report) => (
            <Link
              to={`/reports/${report.reportId}`}
              key={report.reportId}
              className="p-4 rounded-md bg-card border flex items-center justify-between hover:bg-secondary/20 cursor-pointer transition-colors"
            >
              <div>
                <h3 className="font-medium">{report.reportName}</h3>
                <p className="text-sm text-muted-foreground">
                  {report.createdAt?.toDate()?.toDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {JSON.parse(report.jsonReport).site[0]?.alerts.length}{" "}
                    findings
                  </p>
                  {/* <StatusBadge
                    status={
                      report.status as "success" | "warning" | "error" | "info"
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
      )}
    </>
  );
}

export default function Reports() {
  const { currentUser } = getAuth();
  const {
    isPending,
    isLoading,
    error,
    data: productApis,
  } = useQuery({
    queryKey: ["product-apis"],
    queryFn: async () => getUserProductAPIs(currentUser.uid),
    retry: false,
  });
  const [selectedPeriod, setSelectedPeriod] = useState("30days");
  const [selectedTab, setSelectedTab] = useState("reports");

  useEffect(() => {
    setSelectedTab("reports");
  }, []);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Security Reports</h1>
          <p className="text-muted-foreground">
            View and analyze your API security assessment reports
          </p>
        </div>
        <div>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="6months">Last 6 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending || isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error.message}</div>
      ) : productApis.length === 0 ? (
        <div className="text-muted-foreground text-center py-4">
          No saved product APIs found
        </div>
      ) : (
        <Tabs defaultValue={productApis[0].productAPIId} className="w-full">
          <TabsList className="w-full mb-6 flex flex-wrap h-auto gap-2 justify-start bg-transparent p-0">
            {productApis.map((productApi) => (
              <TabsTrigger
                key={productApi.productAPIId}
                value={productApi.productAPIId}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md px-4 py-2"
              >
                {productApi.productName}
              </TabsTrigger>
            ))}
          </TabsList>

          {productApis.map((productApi) => (
            <TabsContent
              key={productApi.productAPIId}
              value={productApi.productAPIId}
              className="pt-4"
            >
              <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
              >
                <TabsList className="grid w-full md:w-[600px] grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="reports">Report List</TabsTrigger>
                  <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Vulnerability Summary</CardTitle>
                        <CardDescription>
                          Distribution by severity level
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={severityData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={4}
                                dataKey="value"
                              >
                                {severityData.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={entry.color}
                                  />
                                ))}
                              </Pie>
                              <Tooltip
                                formatter={(value) => [`${value} issues`, ""]}
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  borderColor: "hsl(var(--border))",
                                  borderRadius: "var(--radius)",
                                }}
                              />
                              <Legend />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Vulnerability Trend</CardTitle>
                        <CardDescription>
                          Total vulnerabilities over time
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={trendData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "hsl(var(--card))",
                                  borderColor: "hsl(var(--border))",
                                  borderRadius: "var(--radius)",
                                }}
                              />
                              <Bar
                                dataKey="vulnerabilities"
                                fill="hsl(var(--primary))"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>API Security by Endpoint</CardTitle>
                      <CardDescription>
                        Vulnerabilities grouped by API endpoint
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={vulnerabilityData}
                            layout="vertical"
                            margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "hsl(var(--card))",
                                borderColor: "hsl(var(--border))",
                                borderRadius: "var(--radius)",
                              }}
                            />
                            <Legend />
                            <Bar
                              dataKey="critical"
                              stackId="a"
                              fill="#EF4444"
                              name="Critical"
                            />
                            <Bar
                              dataKey="high"
                              stackId="a"
                              fill="#F59E0B"
                              name="High"
                            />
                            <Bar
                              dataKey="medium"
                              stackId="a"
                              fill="#3B82F6"
                              name="Medium"
                            />
                            <Bar
                              dataKey="low"
                              stackId="a"
                              fill="#10B981"
                              name="Low"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="reports" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Reports</CardTitle>
                      <CardDescription>
                        Full list of security assessment reports
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProductAPiTestingReports
                        productAPIId={productApi.productAPIId}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="trends" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Trends</CardTitle>
                      <CardDescription>
                        Analysis of vulnerability trends over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-muted-foreground p-8">
                        <p>Detailed trend analysis will appear here.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </TabsContent>
          ))}
        </Tabs>
      )}
    </MainLayout>
  );
}
