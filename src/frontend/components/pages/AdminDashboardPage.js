import React, { useState, useEffect } from "react";
import StatCard from "../admin/StatCard";
import TabButton from "../admin/TabButton";
import ResourceTable from "../admin/ResourceTable"; // TODO: Refactor to new obj props!
import EditAdviceModal from "../admin/EditAdviceModal"; // TODO: Refactor to new props!
import "../../styles/AdminDashboard.css";
import {get, post} from 'axios';

/*
 * NOTE:
 * Currently, ResourcesTable is used to display posts.
 * It currently does not fully display all attributes to posts in Limbo.
 * This is intentional, I haven't restructured the data yet. Once that is done,
 * ResourceTable and EditModal should be updated to match.
 * TODO:
 * - axios.post() to push changes made in EditAdviceModal
 */

/* Builds Admin page to be called by App */
function AdminDashboard() {
    /* State tuples for activeTab, resources, advice, editResource, and
     * editAdvice 
     */
  const [activeTab, setActiveTab] = useState("resource");
  const [posts, setPosts] = useState([]); // generic posts values
  const [editPost, setEditPosts] = useState(null); // generic editor values

  // Ubuquitous msg
  const [msg, setMsg] = useState(null);
    
    useEffect(() => {
        // TODO: update limbo.category to limbo.tag
        // TODO: update limbo.type to limbo.category
        let params = {
            type : activeTab
        };

        get("/api/limbo", {
            headers: {'Content-Type': 'application/json'},
            params: params
        }).then((res) => {
                setPosts([...res.data.payload]);
            }).catch(err => {
                console.log(err.response);
                setMsg(`Couldn't load data. Status ${err.response.status}`);
    });

    }, [activeTab]);

  /* When a change occurs, update status of resource(if true)/advice with 
     newStatus */
  const handleStatusChange = (id, newStatus, isResource) => {
    setPosts(
        posts.map((item) => 
            item.id === id ? {...item, status: newStatus} : item
        ));
  };

  const handleSave = (updatedPost) => {
    setPosts(
      posts.map((item) =>
        item.id === updatedPost.id ? updatedPost : item
      )
    );
    setEditPosts(null);
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Admin Dashboard</h1>

      {msg !== null ?
        (<div><h1>{msg}</h1></div>) : 
      (<div className="dashboard-stats">
        {/* Calls stat card for both Resources and Advice to show pending 
        entries */}
        {/* NOTE: Is a reasonable alternative to displaying pending psots */}
        { activeTab === "resource" && (
        <StatCard title="Pending posts:" value={posts.length} /> )}
        { activeTab === "advice" && (
        <StatCard title="Pending posts:" value={posts.length} /> )}
      </div>)}

      {msg === null &&
      (<div className="dashboard-tabs">
        {/* Calls TabButton to distingish showing resources/advice based on 
        what a user picks */}

        <TabButton
          label="Resources"
          isActive={activeTab === "resource"}
          onClick={() => setActiveTab("resource")} /* calls setActiveTab to 
          show resources posts to set as active */
        />
        <TabButton
          label="Advice"
          isActive={activeTab === "advice"}
          onClick={() => setActiveTab("advice")} /* Sets advice as activeTab to
          show advice posts */
        />
      </div>)}

      {msg === null &&
      (<div className="dashboard-content">
         {/* TODO: Update to new Object setup to handle both types gracefully! */}
         {/* FIXME: EditModal breakswhen selecting Edit! */}
          <ResourceTable /* calls ResourceTable */
            resources={posts} /* Passes Resources array to ResourceTable */
            onStatusChange={(id, status) =>
              handleStatusChange(id, status, true)
            }
            onEdit={setEditPosts} /* passes setEditResource as function for 
            onEdit */
          />
      </div>)}

      {editPost && ( /* when true, launch EditAdviceModal */
        <EditAdviceModal
          advice={editPost}
          onSave={handleSave}
          onClose={() => setEditPosts(null)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
