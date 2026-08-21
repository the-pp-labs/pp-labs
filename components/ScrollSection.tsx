import React, { forwardRef } from "react";

interface ScrollSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  zIndex?: number;
}

export const ScrollSection = forwardRef<HTMLDivElement, ScrollSectionProps>(
  ({ children, className = "", zIndex = 1, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 w-full h-[100svh] overflow-visible will-change-transform bg-paper ${className}`}
        style={{ zIndex }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScrollSection.displayName = "ScrollSection";
