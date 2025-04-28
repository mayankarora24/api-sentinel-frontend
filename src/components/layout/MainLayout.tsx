import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Plus, Search } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 ml-64">
        <header className="h-14 border-b flex items-center justify-end px-4">
          {/* <div className="relative w-64">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="pl-8 pr-4 py-1 w-full rounded-md bg-muted/50 border-0 focus:ring-1 focus:ring-primary" 
            />
          </div> */}
          <div className="flex items-center gap-2">
            <button className="py-2 px-4 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Register New API
            </button>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
      <Toaster />
      <SonnerToaster />
    </div>
  );
}
