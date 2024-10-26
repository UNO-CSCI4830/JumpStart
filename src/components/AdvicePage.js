import React from "react";
import Sidebar from "./AdviceSidebar";
import Content from "./AdviceContent";
import "../styles/Content.css";

export default function Advice() {
  return (
    <div className="advice-container">
      <Sidebar />
      <Content />
    </div>
  );
}
