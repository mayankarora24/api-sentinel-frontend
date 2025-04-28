import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { getAuth } from "firebase/auth";
import {
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { saveProductAPI } from "@/services/product-api";
import { useToast } from "@/hooks/use-toast";

export default function ProductApiForm({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [productName, setProductName] = useState("");
  const [targetUrl, setEndpoint] = useState("");
  const [openAPISpecPath, setOpenAPISpecPath] = useState("");
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { currentUser } = getAuth();

    try {
      if (!currentUser || !currentUser.uid)
        throw new Error("Please log in first");
      if (!productName || !targetUrl || !openAPISpecPath)
        throw new Error("Please fill in all fields");

      await saveProductAPI(
        {
          productName,
          targetUrl,
          openAPISpecPath,
        },
        currentUser.uid
      );

      toast.toast({
        title: "Success",
        description: "Product API information saved successfully",
        variant: "default",
      });
      setProductName("");
      setEndpoint("");
      setOpenAPISpecPath("");
      onClose();
    } catch (error) {
      console.log(error);
      toast.toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogContent>
      <DialogTitle>New Product API</DialogTitle>
      <DialogDescription>
        Configure and save a new Product API to be tested for vulnerabilities in
        the future
      </DialogDescription>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              placeholder="Payment API Gateway"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
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
            <Label htmlFor="openApiSpec">OPENAPI spec endpoint</Label>
            <Input
              id="openApiSpec"
              placeholder="/apispec_1.json"
              value={openAPISpecPath}
              onChange={(e) => setOpenAPISpecPath(e.target.value)}
              required
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Saving..." : "Save API Information"}
        </Button>
      </form>
    </DialogContent>
  );
}
