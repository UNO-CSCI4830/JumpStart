import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import Advice from "./components/pages/AdvicePage";
import EventsPage from "./components/pages/EventsPage";
import ConnectPage from "./components/pages/ConnectPage";
import ResourcePage from "./components/pages/ResourcePage";
import Home from "./components/Home";
import Donate from "./components/Donate";
import Discord from "./components/Discord";

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
            <Route path="/advice" element={<Advice />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/discord" element={<Discord />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
