export function ProgressDisplay({ progress }: { progress: number }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
      <div className="h-2.5 rounded-full bg-blue-600" style={{ width: `${progress}%` }} />
    </div>
  );
}
