import React from "react";
import "../styles/Sidebar.css";
import yt from "../assets/yt-icon.png";

export default function Sidebar() {
    document.addEventListener("mousemove", function (e) {
        let ele = document.getElementsByClassName("sidebar")[0];
        if (ele !== undefined) {
            let distance = ele.offsetLeft + ele.offsetWidth - e.pageX;
            distance < 15 && distance > -15
                ? ele.classList.add("more-width")
                : ele.classList.remove("more-width");
            // console.log(distance);
            // console.log(ele[0].offsetLeft);
            // console.log(ele[0].offsetWidth);
        }
    });

    return (
        <div className="sidebar">
            <div className="yt-menu">
                <span
                    className="material-symbols-outlined menu"
                    // onClick={handleClick}
                >
                    menu
                </span>
                <img src={yt} height={20} alt="icon" />
                <h1>Youtube</h1>
            </div>
            <section>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">home</span>
                    <p>Home</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">S</span>
                    <p>Shorts</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        subscriptions
                    </span>
                    <p>Subscriptions</p>
                </div>
            </section>

            <section>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        video_library
                    </span>
                    <p>Library</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">history</span>
                    <p>History</p>
                </div>
            </section>

            <section>
                <p>Explore</p>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        local_fire_department
                    </span>
                    <p>Trending</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        music_note
                    </span>
                    <p>Music</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">movie</span>
                    <p>Movies & TV</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">sensors</span>
                    <p>Live</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        stadia_controller
                    </span>
                    <p>Gaming</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">news</span>
                    <p>News</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">trophy</span>
                    <p>Sport</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">lightbulb</span>
                    <p>Learning</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">styler</span>
                    <p>Fashion & beauty</p>
                </div>
            </section>

            <section>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">
                        add_circle
                    </span>
                    <p>Browse channels</p>
                </div>
            </section>

            <section>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">settings</span>
                    <p>Settings</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">flag</span>
                    <p>Report history</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">help</span>
                    <p>Help</p>
                </div>
                <div className="sidebar-pair">
                    <span className="material-symbols-outlined">feedback</span>
                    <p>Send feedback</p>
                </div>
            </section>

            <section className="last-section">
                <div className="menu-links">
                    <a href="/">About</a>
                    <a href="/">Press</a>
                    <a href="/">Copyright</a>
                    <a href="/">Contact us</a>
                    <a href="/">Creator</a>
                    <a href="/">Advertise</a>
                    <a href="/">Developers</a>
                </div>
                <div className="menu-links">
                    <a href="/">Terms</a>
                    <a href="/">Privacy</a>
                    <a href="/">Policy & Safety</a>
                    <a href="/">How YouTube works</a>
                    <a href="/">Test new features</a>
                </div>
                <p>© 2023 Stef44n</p>
            </section>
        </div>
    );
}
