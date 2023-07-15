import React, { useEffect, useState } from "react";
import "../styles/Video.css";
import mockData from "../testData/mockDataTest";
import mockDataCat from "../testData/mockDataCategory";
import mockDataVidsByCategory from "../testData/mockDataVidsByCategory";
import mockDataChannel from "../testData/mockDataChannel";
import mockDataCommentThreads from "../testData/mockDataCommentThreads";
// require(`dotenv`).config();
// import API_KEY from "../testData/apikey";
import {
    addCommas,
    formatNumber,
    calculateTimeDifference,
    formatDuration,
} from "./HelperFunctions";

//Quick TEST
let num = 315;
formatNumber(num);

export default function Video() {
    const [apiData, setApiData] = useState(mockData.items[3]);
    const [apiCommentsData, setApiCommentsData] = useState(
        mockDataCommentThreads.items
    );
    const [apiVidsByCatData, setApiVidsByCatData] = useState(
        mockDataVidsByCategory.items
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
                        // ?autoplay=1&mute=1&controls=0
                        // frameBorder="20"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen={true}
                        title="video"
                    ></iframe>
                </div>
                <h2 className="title">{apiData.snippet.title}</h2>
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
                            <h3> {apiData.snippet.channelTitle}</h3>
                            <p>{formatNumber(channelSubs)} subscribers</p>
                        </div>
                        <button className="subscribe">Subscribe</button>
                    </div>
                    <div className="video-buttons">
                        <div className="rate-video">
                            <button className="like">
                                <span className="material-symbols-rounded">
                                    thumb_up
                                </span>

                                {formatNumber(apiData.statistics.likeCount)}
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
                        <p>
                            {formatNumber(apiData.statistics.viewCount)} views{" "}
                        </p>
                        <p>
                            {calculateTimeDifference(
                                apiData.snippet.publishedAt
                            )}
                        </p>
                    </div>
                    <p>
                        {videoCategory}
                        --category --description--
                        {/* {apiData.snippet.description} */}
                    </p>
                </div>
                <p className="comment-count">
                    {addCommas(apiData.statistics.commentCount)} Comments
                </p>
                <div className="add-comment">
                    <img
                        className="avatar"
                        alt="avatar"
                        src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
                    ></img>
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
                                        @
                                        {
                                            comment.snippet.topLevelComment
                                                .snippet.authorDisplayName
                                        }
                                    </a>
                                    <p>
                                        {calculateTimeDifference(
                                            comment.snippet.topLevelComment
                                                .snippet.publishedAt
                                        )}{" "}
                                    </p>
                                </div>
                                <div className="comment-body">
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
                                        {formatNumber(
                                            comment.snippet.topLevelComment
                                                .snippet.likeCount
                                        )}{" "}
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
                {apiVidsByCatData.map((video, index) => (
                    <div className="suggestion" key={index}>
                        <div className="suggestion-thumbnail">
                            <img
                                className="suggestion-thumbnail"
                                alt="thumbnail"
                                src={video.snippet.thumbnails.default.url}
                            ></img>
                            <div className="duration">
                                {formatDuration(video.contentDetails.duration)}
                            </div>
                        </div>
                        <div className="suggestion-info">
                            <h3>{video.snippet.title}</h3>
                            <p>{video.snippet.channelTitle} </p>
                            <div className="suggestion-data">
                                <p>
                                    {formatNumber(video.statistics.viewCount)}{" "}
                                    views •
                                </p>
                                <p>
                                    {calculateTimeDifference(
                                        video.snippet.publishedAt
                                    )}{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
