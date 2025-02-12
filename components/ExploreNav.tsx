import React from "react";

const ExploreNav = () => {
  return (
    <nav className="w-full h-12 border-b flex items-center">
      <div className="w-full max-w-screen-xl">
        <ul className="flex items-center gap-x-3 text-sm">
          <li>Technology</li>
          <li>Robotics</li>
          <li>Computer Science</li>
          <li>AI</li>
          <li>Software Engineering</li>
          <li>Agriculture</li>
        </ul>
      </div>
    </nav>
  );
};

export default ExploreNav;
