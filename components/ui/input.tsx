// components/ui/input.tsx
import * as React from "react"
// import { cn } from "@/lib/utils" // DELETED - NO LONGER USED

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    // Base Bootstrap form-control with custom styles
    // Directly concatenate base Bootstrap classes with provided className
    const finalClasses = `form-control d-flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className || ''}`.trim();

    return (
      <input
        type={type}
        className={finalClasses}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }