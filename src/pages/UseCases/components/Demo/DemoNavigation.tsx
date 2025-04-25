
import React from "react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { path: "/use-cases", label: "Overview" },
  { path: "/compare/companies", label: "Compare Companies" },
  { path: "/compare/products", label: "Compare Products" },
  { path: "/product-analysis", label: "Product Analysis" },
];

const DemoNavigation = () => {
  const location = useLocation();

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            location.pathname === item.path
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
};

export default DemoNavigation;
