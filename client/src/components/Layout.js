import React, { useState } from "react";
import "../Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  // User Menu
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "fa-solid fa-hospital",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "fa-solid fa-address-card",
    },
  ];

  // Admin Menu
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Users",
      path: "/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Doctors",
      path: "/doctors",
      icon: "fa-solid fa-user-doctor",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "fa-solid fa-address-card",
    },
  ];

  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  return (
    <div className="main p-2">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h2 className="logo">MMH</h2>
          </div>

          <div className="menu">
            {menuToBeRendered.map((menu) => {
              // Activate sidebar menu
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}

            
            <div
              className={`d-flex menu-item`} onClick={() => {
                localStorage.clear()
                navigate("/login")
              }}
            >
              <i className="fa-solid fa-power-off"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>


          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="fa-regular fa-eye head-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye head-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

            <div className="d-flex align-items-center px-4">
              <i className="fa-solid fa-bell head-action-icon px-3"></i>
              <Link className="anchor" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;