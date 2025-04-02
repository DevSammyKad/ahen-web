import React from "react";
import { useLocation, Link } from "react-router-dom";

// Utility function to format path parts
const formatPathPart = (part) => {
  return decodeURIComponent(part.replace(/-/g, " "))
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  if (pathParts.length === 0) return null;

  const items = pathParts.map((part, index) => ({
    label: formatPathPart(part), // Format each part
    href: "/" + pathParts.slice(0, index + 1).join("/"),
    isActive: index === pathParts.length - 1,
    isUser: part === "user", // Check if part is 'user'
  }));

  return (
    <nav aria-label="breadcrumb" className="py-4 overflow-x-auto">
      <ol className="breadcrumb flex flex-wrap text-sm text-gray-600">
        <li className="breadcrumb-item">
          <Link to="/" className="text-black hover:underline" aria-label="Home">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
        </li>
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              item.isActive ? "text-black font-semibold" : ""
            }`}
            aria-current={item.isActive ? "page" : undefined}>
            {item.isActive ? (
              <>{item.label}</>
            ) : item.label.toLowerCase() === "user" ? (
              <>
                <span className="text-black">{item.label}</span>
                <span className="mx-2 text-gray-400">/</span>
              </>
            ) : (
              <>
                <Link
                  to={item.href}
                  className="text-black hover:underline"
                  aria-label={`Navigate to ${item.label}`}>
                  {item.label}
                </Link>
                <span className="mx-2 text-gray-400">/</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
