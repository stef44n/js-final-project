// import React, { useEffect, useState } from "react";
import "../styles/Video.css";
// import mockData from "../testData/mockDataTest";
// require(`dotenv`).config();
// import API_KEY from "../testData/apikey";

export default function Video() {
    return (
        <div className="video-background">
            <div className="current-video">
                <div className="video-player"></div>
                <h2 className="title">Video Title</h2>
                <div className="video-info">
                    {/* <div className="channel-and-video-buttons"> */}
                    <div className="channel">
                        <div className="avatar"></div>
                        <div className="channel-info">
                            <h3>Channel Name</h3>
                            <p>Subscriber count</p>
                        </div>
                        <button className="subscribe">Subscribe</button>
                    </div>
                    <div className="video-buttons">
                        <div className="rate-video">
                            <button className="like">
                                <span class="material-symbols-rounded">
                                    thumb_up
                                </span>
                                number
                            </button>
                            <button className="dislike">
                                <span class="material-symbols-rounded">
                                    thumb_down
                                </span>
                            </button>
                        </div>
                        <button className="share">
                            <span class="material-symbols-outlined">share</span>
                            Share
                        </button>
                        <button className="save">
                            <span class="material-symbols-outlined">
                                playlist_add
                            </span>
                            Save
                        </button>
                        <button className="more">
                            <span class="material-symbols-outlined">
                                more_horiz
                            </span>
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                <div className="video-description">
                    <div className="stats">
                        <p>View count</p>
                        <p>Release date</p>
                    </div>
                    <p>description</p>
                </div>
                <p className="comment-count">No of comments</p>
                <div className="add-comment">
                    <div className="avatar"></div>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="comment-input"
                    ></input>
                </div>
                <div className="comments">
                    <div className="comment">
                        <div className="avatar"></div>
                        <div className="comment-info">
                            <div className="comment-data">
                                <p>@Name</p>
                                <p>Time</p>
                            </div>
                            <div className="comment-body">Comment body</div>
                            <div className="comment-buttons">
                                <button>
                                    <span class="material-symbols-rounded">
                                        thumb_up
                                    </span>
                                </button>
                                <p>Number of likes</p>
                                <button>
                                    <span class="material-symbols-rounded">
                                        thumb_down
                                    </span>
                                </button>
                                <button>Reply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="suggestions">
                <div className="suggestion">
                    <div className="suggestion-thumbnail"></div>
                    <div className="suggestion-info">
                        <h3>Title</h3>
                        <p>Channel name</p>
                        <div className="suggestion-data">
                            <p>Views</p>
                            <p>Time</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
