import { cn } from "@/lib/utils"
import { Loader2Icon } from "lucide-react"

function Spinner({
  className,
  ...props
}) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader2Icon
        data-slot="spinner"
        role="status"
        aria-label="Loading"
        className={cn("size-10 animate-spin", className)}
        {...props} />
    </div>
  );
}

export { Spinner }
