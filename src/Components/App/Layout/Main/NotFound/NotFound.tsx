import "./NotFound.css";

import notFound from "assets/img/404-Not-Found.jpg";

import React from "react";

export function NotFound() {
  const isSidebarOpen = JSON.parse(localStorage.getItem("isSidebarOpen") || "true");

  return (
    <div id="my-main" className={isSidebarOpen ? "" : "my-main-margin-left"}>
      <div className="not_found">
        <img src={notFound} />
      </div>
    </div>
  );
}
