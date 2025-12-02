import React from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "border rounded-lg px-3 py-2 text-sm w-full outline-none focus:ring-2 focus:ring-blue-400",
        className
      )}
      {...props}
    />
  );
}
