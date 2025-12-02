import React from "react";
import clsx from "clsx";

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({ size = "md", className, ...props }: AvatarProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <img
      className={clsx(
        "rounded-full object-cover border shadow",
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
