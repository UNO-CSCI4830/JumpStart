import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
<<<<<<< HEAD
import AdvicePage from "./components/pages/AdvicePage";
=======
import Advice from "./components/pages/AdvicePage";
>>>>>>> e69af340451c6e97daef36bbaaca9c43e9cafce1
import EventsPage from "./components/pages/EventsPage";
import ConnectPage from "./components/pages/ConnectPage";
import ResourcePage from "./components/pages/ResourcePage";

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
<<<<<<< HEAD
            <Route path="/advice" element={<AdvicePage />} />
=======
            <Route path="/advice" element={<Advice />} />
>>>>>>> e69af340451c6e97daef36bbaaca9c43e9cafce1
            <Route path="/events" element={<EventsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
