import React from "react";
import "../styles/Navbar.css";
import yt from "../assets/yt-icon.png";

export default function Navbar() {
    return (
        <header>
            <div>
                <span class="material-symbols-outlined menu">menu</span>
                <img src={yt} height={20} alt="icon" />
                <h1>Youtube</h1>
            </div>
            <div className="search-div">
                <input type="text" placeholder="Search" />
                <button className="search-button">
                    <span class="material-symbols-outlined">search</span>
                </button>
            </div>
            <div>
                <span class="material-symbols-outlined more-vert">
                    more_vert
                </span>
                <button className="sign-in-button">
                    <span class="material-symbols-outlined account-circle">
                        account_circle
                    </span>
                    Sign In
                </button>
            </div>
        </header>
    );
}
