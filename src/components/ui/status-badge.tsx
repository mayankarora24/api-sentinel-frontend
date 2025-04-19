
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type StatusType = "success" | "warning" | "error" | "info";

interface StatusBadgeProps {
  status: StatusType;
  children: ReactNode;
  className?: string;
}

export function StatusBadge({ status, children, className }: StatusBadgeProps) {
  const statusColors = {
    success: "bg-status-success/10 text-status-success border-status-success/30",
    warning: "bg-status-warning/10 text-status-warning border-status-warning/30",
    error: "bg-status-error/10 text-status-error border-status-error/30",
    info: "bg-status-info/10 text-status-info border-status-info/30"
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusColors[status],
        className
      )}
    >
      {children}
    </span>
  );
}
