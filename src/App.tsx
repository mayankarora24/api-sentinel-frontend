import ProtectedRoute from "@//components/auth/ProtectedRoute";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ApiTests from "./pages/ApiTests";
import ScheduledChecks from "./pages/ScheduledChecks";
import Reports from "./pages/Reports";
import ReportDetail from "./pages/ReportDetail";
import ApplicationReports from "./pages/ApplicationReports";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// This would normally be provided by an auth context/provider
// Set to true for demo purposes
const isAuthenticated = true;

// Simple auth guard component
// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   return <>{children}</>;
// };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/api-tests"
              element={
                <ProtectedRoute>
                  <ApiTests />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-apis"
              element={
                <ProtectedRoute>
                  <ScheduledChecks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports/:id"
              element={
                <ProtectedRoute>
                  <ReportDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/app-reports"
              element={
                <ProtectedRoute>
                  <ApplicationReports />
                </ProtectedRoute>
              }
            />

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
