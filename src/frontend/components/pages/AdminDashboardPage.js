import React, { useState } from "react";
import StatCard from "../admin/StatCard";
import TabButton from "../admin/TabButton";
import ResourceTable from "../admin/ResourceTable";
import AdviceTable from "../admin/AdviceTable";
import EditResourceModal from "../admin/EditResourceModal";
import EditAdviceModal from "../admin/EditAdviceModal";
import { initialResources, initialAdvice } from "../../utils/AdminData";
import "../../styles/AdminDashboard.css";

/* Builds Admin page to be called by App */
function AdminDashboard() {
    /* State tuples for activeTab, resources, advice, editResource, and
     * editAdvice 
     */
  const [activeTab, setActiveTab] = useState("resources");
  const [resources, setResources] = useState(initialResources);
  const [advice, setAdvice] = useState(initialAdvice);
  const [editResource, setEditResource] = useState(null);
  const [editAdvice, setEditAdvice] = useState(null);

  /* When a change occurs, update status of resource(if true)/advice with 
     newStatus */
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

    /* Saves updated item as new resource */
  const handleSaveResource = (updatedResource) => {
    setResources(
      resources.map((item) =>
        item.id === updatedResource.id ? updatedResource : item
      )
    );
    setEditResource(null); /* clears state of modifier function in tuple. 
    ??? Only here to reset editResource to null? */
  };

    /* Saves updated item as new advice */
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
        {/* Calls stat card for both Resources and Advice to show pending 
        entries */}
        <StatCard title="Total Resources" value={resources.length} />
        <StatCard title="Total Advice Posts" value={advice.length} />
      </div>

      <div className="dashboard-tabs">
        {/* Calls TabButton to distingish showing resources/advice based on 
        what a user picks */}
        <TabButton
          label="Resources"
          isActive={activeTab === "resources"}
          onClick={() => setActiveTab("resources")} /* calls setActiveTab to 
          show resources posts to set as active */
        />
        <TabButton
          label="Advice"
          isActive={activeTab === "advice"}
          onClick={() => setActiveTab("advice")} /* Sets advice as activeTab to
          show advice posts */
        />
      </div>

      <div className="dashboard-content">
        {activeTab === "resources" && (
          <ResourceTable /* calls ResourceTable */
            resources={resources} /* Passes Resources array to ResourceTable */
            /* ???
             * So, by using the state modifier function as well as the id and 
             * status of a post, we can define the function behavior that can 
             * be then passed to ResourceTable */
            onStatusChange={(id, status) =>
              handleStatusChange(id, status, true) /* passes handleStatusChange 
              as function with args entry id, entry status, and confirming that
              its a resource */
            }
            /* guessing the same as above goes for onEdit here too */
            onEdit={setEditResource} /* passes setEditResource as function for 
            onEdit */
          />
        )}
        {activeTab === "advice" && (
          <AdviceTable
            advice={advice} /* Passes advice array to AdviceTable */
            onStatusChange={(id, status) =>
              handleStatusChange(id, status, false) /* like assignment on 
              ResourceTable, but with false to say its not a resource */
            }
            onEdit={setEditAdvice} /* Passes setEditAdvice as function for
            onEdit */
          />
        )}
      </div>

      {editResource && ( /* when true, launch editResourceModal */
        <EditResourceModal
          resource={editResource} /* Passing editResource state variable here 
          as resource to modify */
          onSave={handleSaveResource} /* passing defined arrow func as behavior
          for onSave */
          onClose={() => setEditResource(null)} /* passing setEditResource 
          state modifier with null arg as onClose behavior */
        />
      )}

      {editAdvice && ( /* when true, launch EditAdviceModal */
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
