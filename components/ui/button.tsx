// components/ui/button.tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
// import { cn } from "@/lib/utils" // DELETED - NO LONGER USED

// Define the variant props as before, mapping to custom and Bootstrap classes
type ButtonVariant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    let baseClasses = "btn d-inline-flex align-items-center justify-content-center gap-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

    switch (variant) {
      case "default":
        baseClasses += " btn-black text-white"; // Custom black button
        break;
      case "destructive":
        baseClasses += " bg-red-600 hover:bg-red-700 text-white"; // Custom red for destructive
        break;
      case "outline":
        baseClasses += " btn-outline-custom"; // Custom outline button
        break;
      case "secondary":
        baseClasses += " btn-secondary text-white"; // Bootstrap secondary
        break;
      case "ghost":
        baseClasses += " btn-link text-gray-800 hover:bg-gray-100 dark-theme-bg-202123 dark-text-gray-200 hover:dark-theme-bg-343541"; // Transparent background, hover effect for dark theme
        break;
      case "link":
        baseClasses += " text-blue-600 hover:text-blue-500 text-decoration-underline"; // Blue link
        break;
      default:
        baseClasses += " btn-black text-white";
        break;
    }

    switch (size) {
      case "sm":
        baseClasses += " h-9 rounded-md px-3";
        break;
      case "lg":
        baseClasses += " h-11 rounded-md px-8";
        break;
      case "icon":
        baseClasses += " h-10 w-10 p-2 d-flex align-items-center justify-content-center"; // Fixed size for icon button
        break;
      case "default":
      default:
        baseClasses += " h-10 px-4 py-2";
        break;
    }

    // Default rounded-md, but override for full circles
    // Check for "rounded-full" or similar in className
    if (className && className.includes('rounded-full')) {
        // Assume 'rounded-full' in className handles it, don't add default rounded-md
    } else if (className && className.includes('rounded-pill')) {
        // Assume 'rounded-pill' in className handles it
    }
    else {
        baseClasses += " rounded-md"; // Add default if no explicit rounded class
    }

    // Directly concatenate baseClasses with provided className
    const finalClasses = `${baseClasses} ${className || ''}`.trim();

    return (
      <Comp
        className={finalClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };