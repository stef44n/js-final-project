import React, { useEffect, useState } from "react";
import "../styles/Video.css";
import mockData from "../testData/mockDataTest";
import mockDataCat from "../testData/mockDataCategory";
import mockDataChannel from "../testData/mockDataChannel";
import mockDataCommentThreads from "../testData/mockDataCommentThreads";
// require(`dotenv`).config();
// import API_KEY from "../testData/apikey";

export default function Video() {
    const [apiData, setApiData] = useState(mockData.items[3]);
    const [apiCommentsData, setApiCommentsData] = useState(
        mockDataCommentThreads.items
    );

    // const videoCategoryId = mockDataCat.items[0].id;
    const videoCategory = mockDataCat.items[0].snippet.title;
    const channelSubs = mockDataChannel.items[0].statistics.subscriberCount;
    const channelImageSrc =
        mockDataChannel.items[0].snippet.thumbnails.default.url;

    return (
        <div className="video-background">
            <div className="current-video">
                <div className="video-player">
                    {/* {apiData[3].player.embedHtml} */}
                    <iframe
                        width="100%"
                        // width={apiData.snippet.thumbnails.standard.width}
                        // height="500"
                        height={apiData.snippet.thumbnails.standard.height}
                        // src={`https://www.youtube.com/embed/WqgjIIbpy34`}
                        src={`https://www.youtube.com/embed/${apiData.id}`}
                        frameborder="20"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen="true"
                        title="video"
                    ></iframe>
                </div>
                <h2 className="title">Video Title {apiData.snippet.title}</h2>
                <div className="video-info">
                    {/* <div className="channel-and-video-buttons"> */}
                    <div className="channel">
                        {/* <div className="avatar"></div> */}
                        <img
                            className="avatar"
                            src={channelImageSrc}
                            alt={"channel avatar"}
                        ></img>
                        <div className="channel-info">
                            <h3>Channel Name {apiData.snippet.channelTitle}</h3>
                            <p>Subscriber count-- {channelSubs} </p>
                        </div>
                        <button className="subscribe">Subscribe</button>
                    </div>
                    <div className="video-buttons">
                        <div className="rate-video">
                            <button className="like">
                                <span className="material-symbols-rounded">
                                    thumb_up
                                </span>
                                number {apiData.statistics.likeCount}
                            </button>
                            <button className="dislike">
                                <span className="material-symbols-rounded">
                                    thumb_down
                                </span>
                            </button>
                        </div>
                        <button className="share">
                            <span className="material-symbols-outlined">
                                share
                            </span>
                            Share
                        </button>
                        <button className="save">
                            <span className="material-symbols-outlined">
                                playlist_add
                            </span>
                            Save
                        </button>
                        <button className="more">
                            <span className="material-symbols-outlined">
                                more_horiz
                            </span>
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                <div className="video-description">
                    <div className="stats">
                        <p>View count {apiData.statistics.viewCount} </p>
                        <p>Release date {apiData.snippet.publishedAt}</p>
                    </div>
                    <p>
                        {videoCategory}
                        --category --description--
                        {/* {apiData.snippet.description} */}
                    </p>
                </div>
                <p className="comment-count">
                    No of comments {apiData.statistics.commentCount}
                </p>
                <div className="add-comment">
                    <div className="avatar"></div>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="comment-input"
                    ></input>
                </div>
                <div className="comments">
                    {apiCommentsData.map((comment, index) => (
                        <div className="comment" key={index}>
                            <a
                                className="avatar-link"
                                href={
                                    comment.snippet.topLevelComment.snippet
                                        .authorChannelUrl
                                }
                            >
                                <img
                                    className="avatar"
                                    alt="avatar"
                                    src={
                                        comment.snippet.topLevelComment.snippet
                                            .authorProfileImageUrl
                                    }
                                ></img>
                            </a>
                            <div className="comment-info">
                                <div className="comment-data">
                                    <a
                                        href={
                                            comment.snippet.topLevelComment
                                                .snippet.authorChannelUrl
                                        }
                                    >
                                        @Name{" "}
                                        {
                                            comment.snippet.topLevelComment
                                                .snippet.authorDisplayName
                                        }
                                    </a>
                                    <p>
                                        Time{" "}
                                        {
                                            comment.snippet.topLevelComment
                                                .snippet.publishedAt
                                        }{" "}
                                    </p>
                                </div>
                                <div className="comment-body">
                                    Comment body{" "}
                                    {
                                        comment.snippet.topLevelComment.snippet
                                            .textOriginal
                                    }
                                </div>
                                <div className="comment-buttons">
                                    <button>
                                        <span className="material-symbols-rounded">
                                            thumb_up
                                        </span>
                                    </button>
                                    <p>
                                        Number of likes{" "}
                                        {
                                            comment.snippet.topLevelComment
                                                .snippet.likeCount
                                        }{" "}
                                    </p>
                                    <button>
                                        <span className="material-symbols-rounded">
                                            thumb_down
                                        </span>
                                    </button>
                                    <button>Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
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
