import { useCallback } from "react";
import { cn } from "@/lib/utils";

export function StatusDisplay({ status }) {
  const getColor = useCallback((status) => {
    const statusLowerCase = status.toLowerCase();

    const colorMap = {
      done: "bg-green-200",
      started: "bg-yellow-200",
      "not started": "bg-red-200",
      default: "bg-slate-700",
    };

    return colorMap[statusLowerCase] || colorMap["default"];
  }, []);

  return (
    <span className={cn("inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700", getColor(status))}>
      {status}
    </span>
  );
}
