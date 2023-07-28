import React, { useEffect, useState } from "react";
import "../styles/SearchPage.css";
import mockData from "../testData/mockData";
import mockDataSearchChannels from "../testData/mockDataSearchChannels";
import mockDataSearchVideosByVidId from "../testData/mockDataSearchVideosByVidId";
import API_KEY from "../testData/apikey";
import {
    formatNumber,
    calculateTimeDifference,
    formatDuration,
} from "./HelperFunctions";

// SEARCH PAGE
export default function SearchPage({ onSearchClick, theSearchTerm }) {
    // const [apiData, setApiData] = useState([]);
    const [apiData, setApiData] = useState(mockData.items);

    // Requires 3 different API requests (100 + 1 + 1 tokens)
    const [allChannels, setAllChannels] = useState(mockDataSearchChannels);
    const [allVideos, setAllVideos] = useState(mockDataSearchVideosByVidId);

    const channelIDs = apiData.map((video) => video.snippet.channelId);
    const videoIDs = apiData.map((video) => video.id);
    // const videoIDs = apiData.map((video) => video.id.videoId);
    // console.log(channelIDs);
    // console.log(videoIDs);

    const commaSeparatedString = channelIDs.join(",");
    const commaSeparatedVideos = videoIDs.join(",");
    // console.log(commaSeparatedString);
    // console.log(commaSeparatedVideos);

    const allChannelsIDs = allChannels.items.map((video) => video.id);
    const allVideoIDs = allVideos.items.map((video) => video.id);
    // console.log(allChannelsIDs);
    // console.log(allVideoIDs);

    const getAvatarForChannelId = (channelId) => {
        // console.log(channelId);
        const matchedAvatarIndex = allChannelsIDs.findIndex(
            (avatar) => avatar === channelId
        );
        // console.log(matchedAvatarIndex);
        return matchedAvatarIndex;
    };

    const getInfoForVideoId = (videoId) => {
        // console.log(videoId);
        const matchedVideoIndex = allVideoIDs.findIndex(
            (info) => info === videoId
        );
        // console.log(allVideoIDs);
        // console.log(matchedVideoIndex);
        return matchedVideoIndex;
    };

    const handleClick = (video) => {
        // const data = "video";
        const data = { page: "video", videoData: video };
        onSearchClick(data);
    };

    const getData = async () => {
        try {
            // REPLACE HAZARD with search term
            // const response = await fetch(
            //     `https://www.googleapis.com/youtube/v3/search?key=API_KEY&q=hazard&type=video&part=snippet`,
            //     { mode: "cors" }
            // );

            // const searchData = await response.json();
            const searchData = mockData;
            // const allVideos = searchData.items;
            // const thisVideo = searchData.items[0];
            // const youTubeId = thisVideo.id.videoId;
            // const channelName = thisVideo.snippet.channelTitle;
            // const videoTitle = thisVideo.snippet.title;
            // const videoDescription = thisVideo.snippet.description;
            // const videoReleaseDate = thisVideo.snippet.publishTime;
            // const videoThumbnailURL = thisVideo.snippet.thumbnails.high.url;
            // console.log(searchData);
            // console.log(API_KEY);
            // console.log(youTubeId);
            // console.log(channelName);
            // console.log(videoTitle);
            // console.log(videoDescription);
            // console.log(videoReleaseDate);
            // console.log(videoThumbnailURL);
            // console.log(searchData.items);
            // console.log(searchData.items[0]);
            // console.log(searchData.items[0].snippet.thumbnails.high.url);

            // const thumbnailImage =
            //     searchData.items[0].snippet.thumbnails.high.url;

            // return thumbnailImage;
            // return searchData;
        } catch (err) {
            console.error(err);
        }
    };
    // getData();
    // console.log(getData());

    // useEffect(() => {
    //     // Make the API call and set the data state
    //     // Replace 'apiEndpoint' with your actual API endpoint
    //     // fetch("apiEndpoint")
    //     //     .then((response) => response.json())
    //     //     .then((result) => setData(result))
    //     //     .catch((error) => console.error(error));
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the first API
                const firstAPIResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${theSearchTerm}&type=video&part=snippet&maxResults=50`
                );
                const firstAPIData = await firstAPIResponse.json();
                // Process the data and join specific fields into a string
                const processedDataString = firstAPIData.items
                    .map((video) => video.snippet.channelId)
                    .join(",");
                // Use the processed string in the second API call
                const secondAPIResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/channels?key=${API_KEY}&part=snippet,contentDetails,statistics,brandingSettings&id=${processedDataString}`
                );
                const secondAPIData = await secondAPIResponse.json();

                const processedDataStringTwo = firstAPIData.items
                    .map((video) => video.id.videoId)
                    .join(",");

                // console.log(firstAPIData);
                // console.log(processedDataString);
                // console.log(processedDataStringTwo);

                const thirdAPIResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics&id=${processedDataStringTwo}`
                );
                const thirdAPIData = await thirdAPIResponse.json();
                // Set the state with the received data
                // setApiData(firstAPIData.items);
                setApiData(thirdAPIData.items);
                setAllChannels(secondAPIData);
                setAllVideos(thirdAPIData);
                // console.log(thirdAPIData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [theSearchTerm]);

    return (
        <div className="search-yt-grid">
            {/* <h1>Hello, the search term currently is: {theSearchTerm}</h1> */}
            {apiData.map((video, index) => (
                <article className="search-article" key={index}>
                    <div
                        className="search-video-thumbnail"
                        onClick={() => handleClick(video)}
                    >
                        <img
                            className="search-thumbnail"
                            src={video.snippet.thumbnails.high.url}
                            alt="thumbnail"
                        />
                        <div className="search-duration">
                            {/* {formatDuration(
                                allVideos.items[
                                    getInfoForVideoId(videoIDs[index])
                                ]?.contentDetails.duration
                            )} */}
                        </div>
                    </div>
                    <div className="search-video-info">
                        <div className="search-video-info">
                            <h2>{video.snippet.title}</h2>
                            <p>
                                {formatNumber(
                                    allVideos.items[
                                        getInfoForVideoId(videoIDs[index])
                                    ]?.statistics.viewCount
                                )}{" "}
                                views •{" "}
                                {calculateTimeDifference(
                                    video.snippet.publishedAt
                                )}{" "}
                            </p>
                            <div>
                                <a
                                    href={`http://www.youtube.com/channel/${video.snippet.channelId}`}
                                >
                                    <img
                                        className="search-channel-avatar"
                                        alt="avatar"
                                        src={
                                            allChannels.items[
                                                getAvatarForChannelId(
                                                    channelIDs[index]
                                                )
                                            ]?.snippet.thumbnails.default.url
                                        }
                                    ></img>
                                </a>
                                <a
                                    href={`http://www.youtube.com/channel/${video.snippet.channelId}`}
                                >
                                    {video.snippet.channelTitle}
                                </a>
                            </div>
                            <p className="search-video-desc">
                                {video.snippet.description}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
            {/* {getData} */}
        </div>
    );
}
