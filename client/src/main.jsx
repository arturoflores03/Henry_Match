import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OnBoarding from "./pages/OnBoarding";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Card from  "./components/Card"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<OnBoarding />} />
        <Route path="/card" element={<Card />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
