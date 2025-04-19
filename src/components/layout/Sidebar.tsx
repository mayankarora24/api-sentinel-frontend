
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  CheckSquare, 
  Clock, 
  Home, 
  LogOut, 
  Search, 
  ShieldAlert, 
  User 
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { 
    title: "Dashboard", 
    icon: Home, 
    path: "/" 
  },
  { 
    title: "API Tests", 
    icon: ShieldAlert, 
    path: "/api-tests" 
  },
  { 
    title: "Scheduled Checks", 
    icon: Calendar, 
    path: "/scheduled" 
  },
  { 
    title: "Reports", 
    icon: CheckSquare, 
    path: "/reports" 
  },
  { 
    title: "App Reports", 
    icon: Search, 
    path: "/app-reports" 
  },
  { 
    title: "Recent Activity", 
    icon: Clock, 
    path: "/activity" 
  },
];

export function Sidebar() {
  const location = useLocation();
  
  return (
    <div className="h-screen w-64 fixed top-0 left-0 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border flex items-center gap-2">
        <ShieldAlert className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-sidebar-foreground">API Sentinel</h1>
      </div>

      <div className="flex-1 py-8 px-3">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-medium text-sidebar-foreground">Admin User</p>
              <p className="text-xs text-sidebar-foreground/70">admin@apisentinel.com</p>
            </div>
          </div>
          <button className="p-1 rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
