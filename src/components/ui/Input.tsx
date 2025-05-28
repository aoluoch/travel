import React, { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "../../utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-1">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              "block w-full rounded-md border",
              "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent",
              error
                ? "border-red-500 text-red-900 placeholder-red-300"
                : "border-gray-300 text-gray-900 placeholder-gray-400",
              icon ? "pl-10" : "pl-4",
              "py-2 pr-4 text-sm",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs text-red-500 mt-1">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-gray-500 mt-1">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
