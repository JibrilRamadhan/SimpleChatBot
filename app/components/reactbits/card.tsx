import React from "react";
import clsx from "clsx";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={clsx(
        "bg-white rounded-xl shadow border flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
