import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Advice from "./components/AdvicePage";
import Donate from "./components/Donate";
import Discord from "./components/Discord";
import ResourcePage from "./components/ResourcePage";
import ShareAdviceModal from "./components/AdviceShareModal";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/advice" element={<Advice />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/discord" element={<Discord />} />
          </Routes>
        </main>
        <ShareAdviceModal />
      </div>
    </Router>
  );
}

export default App;
