import React from "react";
import clsx from "clsx";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function CardFooter({ children, className, ...props }: CardFooterProps) {
  return (
    <div
      className={clsx("px-4 py-3 border-t", className)}
      {...props}
    >
      {children}
    </div>
  );
}
