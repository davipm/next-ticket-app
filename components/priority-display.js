import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";

export function PriorityDisplay({ priority }) {
  return (
    <div className="flex justify-start align-baseline">
      <FontAwesomeIcon
        icon={faFire}
        className={cn("pr-1 text-slate-400", priority > 0 && "text-red-400")}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={cn("pr-1 text-slate-400", priority > 1 && "text-red-400")}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={cn("pr-1 text-slate-400", priority > 2 && "text-red-400")}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={cn("pr-1 text-slate-400", priority > 3 && "text-red-400")}
      />
      <FontAwesomeIcon
        icon={faFire}
        className={cn("pr-1 text-slate-400", priority > 4 && "text-red-400")}
      />
    </div>
  );
}
