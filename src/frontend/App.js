import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import AdvicePage from "./components/pages/AdvicePage";
import EventsPage from "./components/pages/EventsPage";
import ConnectPage from "./components/pages/ConnectPage";
import ResourcePage from "./components/pages/ResourcePage";
import AdminDashboardPage from "./components/pages/AdminDashboardPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/advice" element={<AdvicePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/admin" element={<AdminDashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
