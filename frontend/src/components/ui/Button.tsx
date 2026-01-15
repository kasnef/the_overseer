import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Define custom props
interface ButtonCustomProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

// Combine with Framer Motion props
type CombinedProps = ButtonCustomProps & HTMLMotionProps<"button">;

const Button = React.forwardRef<HTMLButtonElement, CombinedProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 select-none";

    const variants = {
      primary:
        "bg-accent text-white hover:bg-accent/90 shadow-soft hover:shadow-glow",
      secondary:
        "bg-surface text-primary border border-border hover:bg-main/50",
      ghost: "hover:bg-main/50 text-secondary hover:text-primary",
      danger: "bg-red-500 text-white hover:bg-red-600",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      md: "h-10 px-4 py-2 text-sm",
      lg: "h-12 px-8 text-base",
      icon: "h-10 w-10",
    };

    // Cast to any to avoid strict children type checking issues with some framer-motion versions
    const MotionButton = motion.button as any;

    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </MotionButton>
    );
  }
);
Button.displayName = "Button";

export { Button };
