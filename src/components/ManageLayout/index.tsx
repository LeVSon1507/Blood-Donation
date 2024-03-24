import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const ManageLayout: React.FC = () => {
  return (
    <div className="w-full max-h-[100vh] h-[100vh] grid">
      <Navbar />
      <div className="w-full h-[calc(100vh_-_80px)] flex flex-row">
        <Sidebar />
        <div className="w-full overflow-y-auto px-6 pt-6">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default ManageLayout;
