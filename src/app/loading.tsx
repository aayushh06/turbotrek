import { CarIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid h-screen place-items-center animate-pulse text-neutral-300 p-4">
      <div role="status">
        <CarIcon className="w-64 h-64"/>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
