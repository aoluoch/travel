import React from "react";
import { cn } from "../../utils";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  initials?: string;
  status?: "online" | "offline" | "away";
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  initials,
  status,
  className,
}) => {
  const sizeStyles = {
    xs: "h-6 w-6 text-xs",
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
    xl: "h-16 w-16 text-xl",
  };

  const statusStyles = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <div className="relative inline-block">
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full",
          sizeStyles[size],
          className
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-700 font-medium">
            {initials || alt.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute right-0 bottom-0 block rounded-full ring-2 ring-white",
            size === "xs" ? "h-1.5 w-1.5" : "h-2.5 w-2.5",
            statusStyles[status]
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
