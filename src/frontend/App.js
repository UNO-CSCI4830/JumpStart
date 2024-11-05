import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
<<<<<<< HEAD
import HomePage from "./components/pages/HomePage";
import Advice from "./components/pages/AdvicePage";
import EventsPage from "./components/pages/EventsPage";
import ConnectPage from "./components/pages/ConnectPage";
import ResourcePage from "./components/pages/ResourcePage";
=======
import Home from "./components/Home";
import Advice from "./components/AdvicePage";
import Donate from "./components/Donate";
import Discord from "./components/Discord";
import ResourcePage from "./components/ResourcePage";
>>>>>>> 5539b6ec9 (trying to match Fritz)

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/connect" element={<ConnectPage />} />
=======
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/discord" element={<Discord />} />
>>>>>>> 5539b6ec9 (trying to match Fritz)
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
