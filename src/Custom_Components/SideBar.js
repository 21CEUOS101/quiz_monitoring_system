import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react
import { Button } from "../components/ui/button";

const Sidebar = () => {
  const location = window.location;
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Quizzes", path: "/quizzes" },
    { name: "Students", path: "/students" },
    { name: "Results", path: "/results" },
  ];

  console.log(location);

  return (
    <div className="h-screen bg-gray-900 text-white w-64 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Quiz Monitoring System</h1>
      </div>
      <nav className="mt-10">
        <ul>
          {navItems.map((item) => (
            <li
              key={item.name}
              className="mb-2 w-full text-left px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <Link to={item.path}>
                <Button variant="ghost" className="w-full">
                  {item.name}
                </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
