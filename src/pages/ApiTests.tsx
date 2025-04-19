
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function ApiTests() {
  const [isLoading, setIsLoading] = useState(false);
  const [testResults, setTestResults] = useState<null | { success: boolean }>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API test - in a real app, this would be an API call
    setTimeout(() => {
      setTestResults({ success: true });
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">API Testing</h1>
        <p className="text-muted-foreground">Test your APIs for security vulnerabilities</p>
      </div>

      <Tabs defaultValue="ondemand" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="ondemand">On-Demand Testing</TabsTrigger>
          <TabsTrigger value="history">Test History</TabsTrigger>
        </TabsList>

        <TabsContent value="ondemand" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
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
                        <Input id="name" placeholder="Payment API Security Test" required />
                      </div>
                      
                      <div>
                        <Label htmlFor="endpoint">API Endpoint URL</Label>
                        <Input id="endpoint" placeholder="https://api.example.com/v1/payments" required />
                      </div>
                      
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
                      </div>

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
                    
                    <div className="space-y-4 pt-4 border-t">
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
                          <Label htmlFor="xss">Cross-Site Scripting (XSS) Test</Label>
                          <p className="text-xs text-muted-foreground">
                            Test for XSS vulnerabilities in responses
                          </p>
                        </div>
                        <Switch id="xss" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="headers-sec">Headers Security Check</Label>
                          <p className="text-xs text-muted-foreground">
                            Verify security headers are properly configured
                          </p>
                        </div>
                        <Switch id="headers-sec" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="auth-test">Authentication Bypass Test</Label>
                          <p className="text-xs text-muted-foreground">
                            Test for authentication bypass vulnerabilities
                          </p>
                        </div>
                        <Switch id="auth-test" defaultChecked />
                      </div>
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Running Tests..." : "Run Security Test"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div>
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
            </div>
          </div>

          {testResults && (
            <Card className="mt-6 border-green-500">
              <CardHeader className="bg-green-500/10">
                <CardTitle className="text-green-600">Test Completed Successfully</CardTitle>
                <CardDescription>
                  The API test has completed. View the detailed report below.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <p>The test results would be shown here in a real implementation.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>
                History of previous API security tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground p-8">
                <p>Your test history will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
