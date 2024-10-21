import React from "react";
import Sidebar from "./Sidebar";
import Content from "./Content";
import "../styles/Content.css";

export default function Advice() {
  return (
    <div className="advice-container">
      <Sidebar />
      <Content />
    </div>
  );
}
