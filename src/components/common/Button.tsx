// import React from "react";
// import { twMerge } from "tailwind-merge";
// import { motion } from "framer-motion";

// type ButtonVariant = "primary" | "secondary" | "ghost";
// type ButtonSize = "sm" | "md" | "lg";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: ButtonVariant;
//   size?: ButtonSize;
//   icon?: React.ReactNode;
//   isLoading?: boolean;
//   price?: number;
//   currency?: string;
// }

// const Button: React.FC<ButtonProps> = ({
//   children,
//   className,
//   variant = "primary",
//   size = "md",
//   icon,
//   isLoading = false,
//   disabled,
//   price,
//   currency = "LYX",
//   ...props
// }) => {
//   const baseClasses =
//     "relative inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50";

//   const variantClasses = {
//     primary:
//       "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 focus:ring-indigo-300",
//     secondary:
//       "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
//     ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-300",
//   };

//   const sizeClasses = {
//     sm: "text-xs px-3 py-1.5",
//     md: "text-sm px-4 py-2",
//     lg: "text-base px-6 py-3",
//   };

//   const classes = twMerge(
//     baseClasses,
//     variantClasses[variant],
//     sizeClasses[size],
//     isLoading || disabled ? "opacity-70 cursor-not-allowed" : "",
//     className
//   );

//   return (
//     <motion.button
//       whileTap={{ scale: 0.97 }}
//       className={classes}
//       disabled={isLoading || disabled}
//       {...props}
//     >
//       {isLoading ? (
//         <svg
//           className="w-4 h-4 mr-2 -ml-1 text-current animate-spin"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//         >
//           <circle
//             className="opacity-25"
//             cx="12"
//             cy="12"
//             r="10"
//             stroke="currentColor"
//             strokeWidth="4"
//           ></circle>
//           <path
//             className="opacity-75"
//             fill="currentColor"
//             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//           ></path>
//         </svg>
//       ) : icon ? (
//         <span className="mr-2">{icon}</span>
//       ) : null}

//       <span>{children}</span>

//       {price !== undefined && (
//         <span className="ml-2 text-xs opacity-90">
//           {price} {currency}
//         </span>
//       )}
//     </motion.button>
//   );
// };

// export default Button;

import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { motion, HTMLMotionProps } from "framer-motion";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  isLoading?: boolean;
  price?: number;
  currency?: string;
  children?: ReactNode; // Explicitly type children as ReactNode
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  isLoading = false,
  disabled,
  price,
  currency = "LYX",
  ...props
}) => {
  const baseClasses =
    "relative inline-flex items-center justify-center font-medium rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-opacity-50";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90 focus:ring-indigo-300",
    secondary:
      "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 focus:ring-gray-300",
    ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-300",
  };

  const sizeClasses = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2",
    lg: "text-base px-6 py-3",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    isLoading || disabled ? "opacity-70 cursor-not-allowed" : "",
    className
  );

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={classes}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <svg
          className="w-4 h-4 mr-2 -ml-1 text-current animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}

      <span>{children}</span>

      {price !== undefined && (
        <span className="ml-2 text-xs opacity-90">
          {price} {currency}
        </span>
      )}
    </motion.button>
  );
};

export default Button;
