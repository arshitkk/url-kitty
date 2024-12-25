import React from "react";

function Container({ children }) {
  return (
    <div className="min-h-screen min-w-screen overflow-x-hidden  dark:bg-[#111827]">
      {children}
    </div>
  );
}

export default Container;
