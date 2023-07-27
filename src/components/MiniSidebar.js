import React from "react";
import "../styles/Sidebar.css";
// import yt from "../assets/yt-icon.png";

export default function Sidebar() {
    return (
        <div className="mini-sidebar section">
            <div className="sidebar-pair vert">
                <span className="material-symbols-outlined">home</span>
                <p>Home</p>
            </div>
            <div className="sidebar-pair vert">
                <span className="material-symbols-outlined">S</span>
                <p>Shorts</p>
            </div>
            <div className="sidebar-pair vert">
                <span className="material-symbols-outlined">subscriptions</span>
                <p>Subscriptions</p>
            </div>
            <div className="sidebar-pair vert">
                <span className="material-symbols-outlined">video_library</span>
                <p>Library</p>
            </div>
            <div className="sidebar-pair vert">
                <span className="material-symbols-outlined">history</span>
                <p>History</p>
            </div>
        </div>
    );
}
