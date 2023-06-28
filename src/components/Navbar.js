import React, { useState } from "react";
import "../styles/Navbar.css";
import yt from "../assets/yt-icon.png";
import Sidebar from "./Sidebar";

export default function Navbar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleMenuClick = () => {
        setIsSidebarOpen((prevState) => !prevState);
    };

    return (
        <div>
            <header>
                <div>
                    <span
                        className="material-symbols-outlined menu"
                        onClick={handleMenuClick}
                    >
                        menu
                    </span>
                    <img src={yt} height={20} alt="icon" />
                    <h1>Youtube</h1>
                </div>
                <div className="search-div-wrapper">
                    <div className="search-div">
                        <span className="material-symbols-outlined">
                            search
                        </span>
                        <input type="text" placeholder="Search" />
                    </div>
                    <button className="search-button">
                        <span className="material-symbols-outlined ignore">
                            search
                        </span>
                    </button>
                </div>
                <div>
                    <span className="material-symbols-outlined more-vert">
                        more_vert
                    </span>
                    <button className="sign-in-button">
                        <span className="material-symbols-outlined account-circle">
                            account_circle
                        </span>
                        Sign In
                    </button>
                </div>
            </header>
            {isSidebarOpen && <Sidebar />}
        </div>
    );
}
