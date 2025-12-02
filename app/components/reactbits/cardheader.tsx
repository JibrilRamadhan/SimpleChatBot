import React from "react";
import clsx from "clsx";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function CardHeader({ children, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={clsx("px-4 py-3 border-b", className)}
      {...props}
    >
      {children}
    </div>
  );
}
