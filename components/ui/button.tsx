import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        xl: "h-18 px-12 py-4 sm:h-24 sm:px-16 sm:py-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  anchorId?: string;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(({ className, variant, size, asChild = false, anchorId, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  if (anchorId) {
    return (
      <Link href={`#${anchorId}`}>
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.7) 0px 1px 5px",
          }}
          {...props}
        />
      </Link>
    );
  } else {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        {...props}
      />
    );
  }
});
Button.displayName = "Button";

export { Button, buttonVariants };
