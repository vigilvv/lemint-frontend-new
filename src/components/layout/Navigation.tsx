import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
// import { CircleUser } from "lucide-react";

interface NavigationProps {
  className?: string;
}

const Navigation: React.FC<NavigationProps> = ({ className }) => {
  const location = useLocation();

  const navItems = [
    { name: "Create", path: "/create" },
    { name: "New", path: "/new" },
    {
      name: "Market",
      path: "/market",
      disabled: true,
      tooltip: "Marketplace coming soon",
    },
    { name: "Collab", path: "/collab" },
  ];

  return (
    <div
      className={twMerge(
        "flex items-center justify-between py-2 w-full mr-3",
        className
      )}
    >
      <div className="flex items-center space-x-1">
        <Link
          to="/"
          className="flex items-center text-lg font-medium text-gray-800"
        >
          <span className="flex items-center justify-center w-8 h-8 mr-2 text-white rounded-full bg-gradient-to-br from-indigo-500 to-purple-600">
            L
          </span>
          LeMint
        </Link>
      </div>

      <nav className="flex items-center">
        <ul className="flex space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name}>
                <Link
                  to={item.disabled ? "#" : item.path}
                  className={item.disabled ? "cursor-not-allowed" : ""}
                  title={item.tooltip}
                >
                  <motion.div
                    className={twMerge(
                      "relative px-3 py-2 text-sm rounded-md transition-colors",
                      isActive
                        ? "text-indigo-700 font-medium"
                        : item.disabled
                        ? "text-gray-400 hover:text-gray-500"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    )}
                    whileHover={!item.disabled ? { y: -1 } : {}}
                    whileTap={!item.disabled ? { y: 0 } : {}}
                  >
                    {item.name}
                    {isActive && !item.disabled && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-indigo-600 rounded-full"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* <div className="w-px h-6 mx-2 bg-gray-200"></div> */}

        {/* <button className="p-1.5 rounded-full hover:bg-gray-100">
          <CircleUser size={20} className="text-gray-700" />
        </button> */}
      </nav>
    </div>
  );
};

export default Navigation;
