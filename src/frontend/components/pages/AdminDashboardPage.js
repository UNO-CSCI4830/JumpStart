import React, { useState, useEffect } from "react";
import StatCard from "../admin/StatCard";
import TabButton from "../admin/TabButton";
import ResourceTable from "../admin/ResourceTable"; // TODO: Refactor to new obj props!
import EditAdviceModal from "../admin/EditAdviceModal"; // TODO: Refactor to new props!
import EditResourceModal from "../admin/EditResourceModal";
import "../../styles/AdminDashboard.css";
import {get, post} from 'axios';

/* Builds Admin page to be called by App */
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("resource");
  const [posts, setPosts] = useState([]); // generic posts values
  const [editPost, setEditPosts] = useState(null); // generic editor values

  // Ubuquitous msg
  const [msg, setMsg] = useState(null);
    
    useEffect(() => {
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

    console.log(posts);

  /* When a change occurs, update status of resource(if true)/advice with 
     newStatus */
  const handleStatusChange = (id, newStatus) => {
    // TODO: axios.post()
    console.log(`${id} was ${newStatus}`);
    post('/api/limbo', {
            post : id,
            status : newStatus
        }).then((res) => 
            console.log(res)
        ).catch((err) =>
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
    post('/api/limbo', {
            post : updatedPost._id,
            edits : edits
        }).then((res) => {
                console.log(res)
            }).catch((err) =>
                console.log(err.response)
            );

    setPosts( // I think this updates the existing posts displayed on screen
    /* If page pulls from DB, and posts update pretty much every time the 
     * modal opens/closes, is this necessary? */
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
          <ResourceTable /* calls ResourceTable */
            resources={posts} /* Passes Resources array to ResourceTable */
            onStatusChange={(id, status) =>
              handleStatusChange(id, status)
            }
            onEdit={setEditPosts} /* passes setEditResource as function for 
            onEdit */
          />
      </div>)}

      {editPost && (
        /* when true, launch EditAdviceModal when advice tab is active */
            (activeTab === "advice" &&
        <EditAdviceModal
          advice={editPost}
          onSave={handleSave}
          onClose={() => setEditPosts(null)}
        />)
        // Or select EditResourceModal if resoruce tab is active
            || (activeTab === 'resource' &&
        <EditResourceModal 
            resource={editPost}
            onSave={handleSave}
            onClose={() => setEditPosts(null)}
            />)
      )}
    </div>
  );
}

export default AdminDashboard;
