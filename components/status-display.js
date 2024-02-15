import { useCallback } from "react";

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
    <span
      className={`inline-block  rounded-full px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status,
      )}`}
    >
      {status}
    </span>
  );
}
