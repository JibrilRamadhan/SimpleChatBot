import React from "react";
import clsx from "clsx";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function CardContent({ children, className, ...props }: CardContentProps) {
  return (
    <div
      className={clsx("px-4 py-2 flex-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}
