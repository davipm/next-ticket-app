import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function PriorityDisplay({ priority }) {
  return (
    <div className="flex justify-start align-baseline">
      <Flame size={20} strokeWidth={3} className={cn("text-slate-400", priority > 0 && "text-red-400")} />
      <Flame size={20} strokeWidth={3} className={cn("text-slate-400", priority > 1 && "text-red-400")} />
      <Flame size={20} strokeWidth={3} className={cn("text-slate-400", priority > 2 && "text-red-400")} />
      <Flame size={20} strokeWidth={3} className={cn("text-slate-400", priority > 3 && "text-red-400")} />
      <Flame size={20} strokeWidth={3} className={cn("text-slate-400", priority > 4 && "text-red-400")} />
    </div>
  );
}
