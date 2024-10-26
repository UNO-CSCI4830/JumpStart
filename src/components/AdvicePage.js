import React, { useState } from "react";
import Sidebar from "./AdviceSidebar";
import Content from "./AdviceContent";
import AdviceShareModal from "./AdviceShareModal";
import "../styles/Content.css";

export default function Advice() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="advice-container">
      <Sidebar onShareClick={handleOpenModal} />
      <Content />
      {isModalOpen && <AdviceShareModal onClose={handleCloseModal} />}
    </div>
  );
}
