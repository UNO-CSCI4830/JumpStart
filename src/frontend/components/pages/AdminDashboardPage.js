import React, { useState } from "react";
import StatCard from "../admin/StatCard";
import TabButton from "../admin/TabButton";
import ResourceTable from "../admin/ResourceTable";
import AdviceTable from "../admin/AdviceTable";
import EditResourceModal from "../admin/EditResourceModal";
import EditAdviceModal from "../admin/EditAdviceModal";
import { initialResources, initialAdvice } from "../../utils/AdminData";
import "../../styles/AdminDashboard.css";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("resources");
  const [resources, setResources] = useState(initialResources);
  const [advice, setAdvice] = useState(initialAdvice);
  const [editResource, setEditResource] = useState(null);
  const [editAdvice, setEditAdvice] = useState(null);

  const handleStatusChange = (id, newStatus, isResource) => {
    if (isResource) {
      setResources(
        resources.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } else {
      setAdvice(
        advice.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    }
  };

  const handleSaveResource = (updatedResource) => {
    setResources(
      resources.map((item) =>
        item.id === updatedResource.id ? updatedResource : item
      )
    );
    setEditResource(null);
  };

  const handleSaveAdvice = (updatedAdvice) => {
    setAdvice(
      advice.map((item) =>
        item.id === updatedAdvice.id ? updatedAdvice : item
      )
    );
    setEditAdvice(null);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      <div className="dashboard-stats">
        <StatCard title="Total Resources" value={resources.length} />
        <StatCard title="Total Advice Posts" value={advice.length} />
      </div>

      <div className="dashboard-tabs">
        <TabButton
          label="Resources"
          isActive={activeTab === "resources"}
          onClick={() => setActiveTab("resources")}
        />
        <TabButton
          label="Advice"
          isActive={activeTab === "advice"}
          onClick={() => setActiveTab("advice")}
        />
      </div>

      <div className="dashboard-content">
        {activeTab === "resources" && (
          <ResourceTable
            resources={resources}
            onStatusChange={(id, status) =>
              handleStatusChange(id, status, true)
            }
            onEdit={setEditResource}
          />
        )}
        {activeTab === "advice" && (
          <AdviceTable
            advice={advice}
            onStatusChange={(id, status) =>
              handleStatusChange(id, status, false)
            }
            onEdit={setEditAdvice}
          />
        )}
      </div>

      {editResource && (
        <EditResourceModal
          resource={editResource}
          onSave={handleSaveResource}
          onClose={() => setEditResource(null)}
        />
      )}

      {editAdvice && (
        <EditAdviceModal
          advice={editAdvice}
          onSave={handleSaveAdvice}
          onClose={() => setEditAdvice(null)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
