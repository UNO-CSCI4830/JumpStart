import React, { useState, useEffect } from "react";
import StatCard from "../admin/StatCard";
import TabButton from "../admin/TabButton";
import ResourceTable from "../admin/ResourceTable"; 
import EditAdviceModal from "../admin/EditAdviceModal"; 
import EditResourceModal from "../admin/EditResourceModal";
import "../../styles/AdminDashboard.css";
import axios from 'axios';  // Correctly importing axios

/* Builds Admin page to be called by App */
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("resource");
  const [posts, setPosts] = useState([]); // generic posts values
  const [editPost, setEditPosts] = useState(null); // generic editor values

  // Ubiquitous msg
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    let params = {
      type: activeTab,
    };

    axios.get("/api/limbo", {
      headers: { 'Content-Type': 'application/json' },
      params: params
    })
    .then((res) => {
        setPosts([...res.data.payload]);
    })
    .catch((err) => {
        console.log(err.response);
        setMsg(`Couldn't load data. Status ${err.response.status}`);
    });
  }, [activeTab]);

  console.log(posts);

  /* When a change occurs, update status of resource(if true)/advice with 
     newStatus */
  const handleStatusChange = (id, newStatus) => {
    console.log(`${id} was ${newStatus}`);
    axios.post('/api/limbo', {  // Using axios.post() here
      post: id,
      status: newStatus
    })
    .then((res) => 
      console.log(res)
    )
    .catch((err) =>
      console.log(err.response)
    );

    setPosts( // Some more graphic updates to visually confirm status change
      posts.map((item) => 
        item._id === id ? {...item, status: newStatus} : item
      ));
  };

  const handleSave = (updatedPost) => {
    let edits = {};
    Object.entries(updatedPost).forEach(([key, val]) => {
      if (key !== "_id") edits[key] = val;
    });

    axios.post('/api/limbo', {  // Using axios.post() here
      post: updatedPost._id,
      edits: edits
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) =>
      console.log(err.response)
    );

    setPosts( // Updating the displayed posts on screen
      posts.map((item) =>
        item._id === updatedPost._id ? updatedPost : item
      )
    );
    setEditPosts(null);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {msg !== null ? (
        <div><h1>{msg}</h1></div>
      ) : (
        <div className="dashboard-stats">
          {/* Calls stat card for both Resources and Advice to show pending entries */}
          {activeTab === "resource" && (
            <StatCard title="Pending posts:" value={posts.length} />
          )}
          {activeTab === "advice" && (
            <StatCard title="Pending posts:" value={posts.length} />
          )}
        </div>
      )}

      {msg === null && (
        <div className="dashboard-tabs">
          {/* Calls TabButton to distinguish showing resources/advice based on 
          what a user picks */}
          <TabButton
            label="Resources"
            isActive={activeTab === "resource"}
            onClick={() => setActiveTab("resource")}
          />
          <TabButton
            label="Advice"
            isActive={activeTab === "advice"}
            onClick={() => setActiveTab("advice")}
          />
        </div>
      )}

      {msg === null && (
        <div className="dashboard-content">
          <ResourceTable
            resources={posts}  // Passes Resources array to ResourceTable
            onStatusChange={(id, status) =>
              handleStatusChange(id, status)
            }
            onEdit={setEditPosts}  // Passes setEditResource as function for onEdit
          />
        </div>
      )}

      {editPost && (
        (activeTab === "advice" && (
          <EditAdviceModal
            advice={editPost}
            onSave={handleSave}
            onClose={() => setEditPosts(null)}
          />
        )) ||
        (activeTab === 'resource' && (
          <EditResourceModal 
            resource={editPost}
            onSave={handleSave}
            onClose={() => setEditPosts(null)}
          />
        ))
      )}
    </div>
  );
}

export default AdminDashboard;
