import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Advice from "./components/Advice";
import Resources from "./components/Resources";
import ShareAdviceModal from "./components/ShareAdviceModal";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Advice />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/advice" element={<Advice />} />
          </Routes>
        </main>
        <ShareAdviceModal />
      </div>
    </Router>
  );
}

export default App;
