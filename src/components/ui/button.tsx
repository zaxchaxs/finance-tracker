import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import SolidShadow from "./solidShadow/SolidShadow";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 font-title font-bold rounded-lg",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary-hover active:bg-primary text-lightWhite ring-1 ring-black transition-all ease-in-out duration-75",
        secondary:
          "bg-secondary active:bg-secondary hover:bg-secondary-hover text-lightWhite hover:text-primary ring-1 ring-black transition-all ease-in-out duration-75",
        destructive:
          "bg-danger active:bg-danger hover:bg-danger-hover text-lightWhite ring-1 ring-black transition-all ease-in-out duration-75",
        outline:
          "border border-input bg-background shadow-md hover:bg-accent hover:text-accent-foreground",
        ghost: "",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const shadowVariants = cva("", {
  variants: {
    variant: {
      default: "bg-gray-900 group-hover:bg-gray-900/80",
      secondary: "bg-primary group-hover:bg-primary-hover",
      destructive: "bg-red-900 group-hover:bg-red-700",
      outline: "",
      ghost: "",
      link: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  normalBtn?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, normalBtn, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <div className="relative z-0 group">
        <Comp
          className={cn(
            buttonVariants({ variant, size, className }),
            "z-20 relative",
            !normalBtn && "-top-1 -left-1 active:top-0 active:left-0"
          )}
          ref={ref}
          {...props}
        />
        {!normalBtn && (
          <SolidShadow background={cn(shadowVariants({ variant }))} />
        )}
      </div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
