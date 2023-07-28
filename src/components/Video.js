import React, { useEffect, useState } from "react";
import "../styles/Video.css";
import mockData from "../testData/mockDataTest";
import mockDataCat from "../testData/mockDataCategory";
import mockDataVidsByCategory from "../testData/mockDataVidsByCategory";
import mockDataChannel from "../testData/mockDataChannel";
import mockDataCommentThreads from "../testData/mockDataCommentThreads";
// require(`dotenv`).config();
import API_KEY from "../testData/apikey";
import {
    addCommas,
    formatNumber,
    calculateTimeDifference,
    formatDuration,
    formatDescription,
    formatDate,
} from "./HelperFunctions";

export default function Video({ videoData, onSuggestion }) {
    const [apiData, setApiData] = useState(mockData.items[3]);
    // const [desData, setDesData] = useState(videoData.snippet.description);
    const [apiCommentsData, setApiCommentsData] = useState(
        mockDataCommentThreads.items
    );
    const [apiVidsByCatData, setApiVidsByCatData] = useState(
        mockDataVidsByCategory.items
    );
    console.log(videoData);
    // console.log(videoData.snippet.categoryId);

    // const videoCategoryId = mockDataCat.items[0].id;
    // const videoCategory = mockDataCat.items[0].snippet.title;
    const channelSubs = mockDataChannel.items[0].statistics.subscriberCount;
    const channelImageSrc =
        mockDataChannel.items[0].snippet.thumbnails.default.url;

    const videoId =
        typeof videoData.id === "string" ? videoData.id : videoData.id.videoId;

    const videoCategory =
        typeof videoData.snippet.categoryId === "string"
            ? videoData.snippet.categoryId
            : 15;
    // console.log(`videoId = ${videoId}`);
    // console.log(`type videoId = ${typeof videoId}`);

    // let descLengthShort = true;
    const [descLengthShort, setDescLengthShort] = useState(true);

    const showMoreOrLess = () => {
        setDescLengthShort((prevState) => !prevState);
        // console.log(descLengthShort);
    };

    const onSuggestionClick = (video) => {
        // console.log("clicked suggestion");
        console.log(video.id);

        const data = { page: "video", videoData: video };
        onSuggestion(data);
    };

    useEffect(() => {
        const vidDescription = document.getElementById("des");
        vidDescription.innerHTML = formatDescription(
            videoData.snippet.description
        );

        const fetchData = async () => {
            try {
                // Start both API calls simultaneously using Promise.all()
                const [firstAPIResponse, secondAPIResponse] = await Promise.all(
                    [
                        // Suggestions
                        fetch(
                            `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&regionCode=GB&videoCategoryId=${videoCategory}&maxResults=50&chart=mostPopular`
                        ),
                        // Comments
                        fetch(
                            `https://www.googleapis.com/youtube/v3/commentThreads?key=${API_KEY}&part=snippet,id&videoId=${videoId}&order=relevance&maxResults=40`
                        ), // You can use data from first API here in the URL or payload
                    ]
                );

                // Assuming the APIs return JSON data, parse the responses
                const firstAPIData = await firstAPIResponse.json();
                const secondAPIData = await secondAPIResponse.json();

                // Set the state with the received data
                setApiVidsByCatData(firstAPIData.items);
                setApiCommentsData(secondAPIData.items);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [videoData]);

    return (
        <div className="vid-video-background">
            <div className="vid-current-video">
                <div className="vid-video-player">
                    {/* {apiData[3].player.embedHtml} */}
                    <iframe
                        width="100%"
                        // width={apiData.snippet.thumbnails.standard.width}
                        // height="500"
                        height={
                            videoData.snippet.thumbnails.standard?.height
                                ? videoData.snippet.thumbnails.standard.height
                                : 480
                        }
                        // src={`https://www.youtube.com/embed/WqgjIIbpy34`}
                        // src={`https://www.youtube.com/embed/${apiData.id}
                        src={`https://www.youtube.com/embed/${videoId}
                        `}
                        // ?autoplay=1&mute=1&controls=0
                        // frameBorder="20"
                        // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen={true}
                        title="video"
                    ></iframe>
                </div>
                {/* <h2 className="vid-title">{apiData.snippet.title}</h2> */}
                <h2 className="vid-title">{videoData.snippet.title}</h2>
                <div className="vid-video-info">
                    {/* <div className="vid-channel-and-video-buttons"> */}
                    <div className="vid-channel">
                        {/* <div className="vid-avatar"></div> */}
                        <img
                            className="vid-avatar"
                            src={channelImageSrc}
                            alt={"channel avatar"}
                        ></img>
                        <div className="vid-channel-info">
                            <h3> {videoData.snippet.channelTitle}</h3>
                            <p>{formatNumber(channelSubs)} subscribers</p>
                        </div>
                        <button className="vid-subscribe">Subscribe</button>
                    </div>
                    <div className="vid-video-buttons">
                        <div className="vid-rate-video">
                            <button className="vid-like">
                                <span className="material-symbols-rounded">
                                    thumb_up
                                </span>

                                {formatNumber(
                                    videoData.statistics?.likeCount
                                        ? videoData.statistics?.likeCount
                                        : 0
                                )}
                            </button>
                            <button className="vid-dislike">
                                <span className="material-symbols-rounded">
                                    thumb_down
                                </span>
                            </button>
                        </div>
                        <button className="vid-share">
                            <span className="material-symbols-outlined">
                                share
                            </span>
                            Share
                        </button>
                        <button className="vid-save">
                            <span className="material-symbols-outlined">
                                playlist_add
                            </span>
                            Save
                        </button>
                        <button className="vid-more">
                            <span className="material-symbols-outlined">
                                more_horiz
                            </span>
                        </button>
                    </div>
                    {/* </div> */}
                </div>
                <div className="vid-video-description">
                    <div className="vid-stats">
                        {descLengthShort ? (
                            <p>
                                {formatNumber(videoData.statistics?.viewCount)}{" "}
                                views{" "}
                            </p>
                        ) : (
                            <p>
                                {addCommas(videoData.statistics?.viewCount)}{" "}
                                views{" "}
                            </p>
                        )}
                        {descLengthShort ? (
                            <p>
                                {calculateTimeDifference(
                                    videoData.snippet.publishedAt
                                )}
                            </p>
                        ) : (
                            <p>{formatDate(videoData.snippet.publishedAt)}</p>
                        )}
                    </div>
                    {/* <p id="des" className="vid-desc-short"> */}
                    <p
                        id="des"
                        className={descLengthShort ? `vid-desc-short` : ``}
                    >
                        {/* {videoCategory} */}
                        --category --description--
                        {/* {apiData.snippet.description} */}
                        {/* {videoData.snippet.description} */}
                        {/* {marked.parse(videoData.snippet.description)} */}
                        {/* <Markdown> */}
                        {/* {formatDescription(videoData.snippet.description)} */}
                        {/* </Markdown> */}
                        {/* {<Markdown>{videoData.snippet.description}</Markdown>} */}
                        {/* {console.log(videoData.snippet.description)} */}
                        {/* {console.log(
                            formatDescription(videoData.snippet.description)
                        )} */}
                    </p>
                    <span className="vid-show-desc" onClick={showMoreOrLess}>
                        {descLengthShort ? `Show more` : `Show less`}
                    </span>
                </div>
                <p className="vid-comment-count">
                    {addCommas(videoData.statistics?.commentCount)} Comments
                </p>
                <div className="vid-add-comment">
                    <img
                        className="vid-avatar"
                        alt="avatar"
                        src="https://yt3.ggpht.com/a/default-user=s88-c-k-c0x00ffffff-no-rj"
                    ></img>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        className="vid-comment-input"
                    ></input>
                </div>
                <div className="vid-comments">
                    {apiCommentsData.map((comment, index) => (
                        <div className="vid-comment" key={index}>
                            <a
                                className="vid-avatar-link"
                                href={
                                    comment.snippet.topLevelComment.snippet
                                        .authorChannelUrl
                                }
                            >
                                <img
                                    className="vid-avatar"
                                    alt="avatar"
                                    src={
                                        comment.snippet.topLevelComment.snippet
                                            .authorProfileImageUrl
                                    }
                                ></img>
                            </a>
                            <div className="vid-comment-info">
                                <div className="vid-comment-data">
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
                                <div className="vid-comment-body">
                                    {
                                        comment.snippet.topLevelComment.snippet
                                            .textOriginal
                                    }
                                </div>
                                <div className="vid-comment-buttons">
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
                                    <button className="vid-reply">Reply</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="vid-suggestions">
                {console.log(apiVidsByCatData)}
                {apiVidsByCatData.map((video, index) => (
                    <div className="vid-suggestion" key={index}>
                        <div
                            className="vid-suggestion-thumbnail"
                            onClick={() => onSuggestionClick(video)}
                        >
                            <img
                                className="vid-suggestion-thumbnail"
                                alt="thumbnail"
                                src={video.snippet.thumbnails.default.url}
                            ></img>
                            <div className="vid-duration">
                                {formatDuration(video.contentDetails.duration)}
                            </div>
                        </div>
                        <div className="vid-suggestion-info">
                            <h3>{video.snippet.title}</h3>
                            <p>{video.snippet.channelTitle} </p>
                            <div className="vid-suggestion-data">
                                <p>
                                    {formatNumber(video.statistics.viewCount)}{" "}
                                    views •{" "}
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
