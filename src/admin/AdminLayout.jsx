import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { StoreContext } from "../Context/StoreContext";
import "./index.css";

const App = () => {
  const { role, token } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    
    if (!storedToken || storedRole !== "admin") {
      toast.error("Access Denied. Admins Only!");
      navigate("/");
    }
  }, [role, token, navigate]);

  return (
    <div className="admin-app">
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
