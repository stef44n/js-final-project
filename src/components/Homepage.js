import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import mockData from "../testData/mockDataTest";
import mockDataAllChannelsOnDisplay from "../testData/mockDataAllChannelsOnDisplay";
// require(`dotenv`).config();
import API_KEY from "../testData/apikey";
import {
    formatNumber,
    calculateTimeDifference,
    formatDuration,
} from "./HelperFunctions";

export default function Homepage({ onHomepageClick, isSidebarFull }) {
    // const [apiData, setApiData] = useState({});
    const [apiData, setApiData] = useState(mockData.items);

    const [allChannels, setAllChannels] = useState(
        mockDataAllChannelsOnDisplay
    );

    // API 1 - popular vids by region
    // get channel IDs
    // map IDs into an array (1)
    // use array to join IDs into a string, separated with a comma
    // use the string to search for channels in API 2
    // API 2 - channels by ID
    // get channels ID
    // map IDs into array (2)
    // use array (1) (with original length and order of videos) to search for the matching ID in array (2) and return its index position
    // use array(1)[index] to specify ID to find
    // use the newly found index from array (2) to map out the avatars in correct order
    const channelIDs = apiData.map((video) => video.snippet.channelId);
    // const channelIDs = apiData.map((video) => video.snippet.channelTitle);
    // console.log(channelIDs);
    // console.log(typeof channelIDs);

    //USE THIS FOR API 2
    // const commaSeparatedString = channelIDs.join(",");

    // console.log(commaSeparatedString);
    // console.log(
    //     mockDataAllChannelsOnDisplay.items[0].brandingSettings.channel.title
    // );
    const allChannelsIDs = allChannels.items.map((video) => video.id);
    // console.log(allChannelsIDs);

    // const [initialArray] = useState(channelIDs);
    // const [secondArray, setSecondArray] = useState(allChannelsIDs);
    // console.log(initialArray);
    // console.log(secondArray);

    const getAvatarForChannelId = (channelId) => {
        // console.log(channelId);
        const matchedAvatarIndex = allChannelsIDs.findIndex(
            (avatar) => avatar === channelId
        );
        // console.log(matchedAvatarIndex);
        // return matchedAvatarIndex ? matchedAvatarIndex.id : "";
        // return channelId;
        return matchedAvatarIndex;
    };

    const handleClick = (video) => {
        // const data = "video";
        const data = { page: "video", videoData: video };
        onHomepageClick(data);
    };
    // console.log(getData());

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data from the first API
                const firstAPIResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&part=snippet,contentDetails,statistics,player&chart=mostPopular&regionCode=GB&maxResults=48`
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
                // Set the state with the received data
                setApiData(firstAPIData.items);
                setAllChannels(secondAPIData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={isSidebarFull ? "home-yt-grid wide" : "home-yt-grid"}>
            {apiData.map((video, index) => (
                <article
                    className="home-article"
                    key={index}
                    onClick={() => handleClick(video)}
                    // onClick={handleClick}
                >
                    {/* {console.log(video.snippet.channelId)} */}
                    {/* {console.log(
                        getAvatarForChannelId(video.snippet.channelId)
                    )} */}
                    <div className="home-video-thumbnail">
                        <img
                            className={
                                isSidebarFull
                                    ? "home-thumbnail short"
                                    : "home-thumbnail"
                            }
                            // src={`${getData()}`}
                            src={video.snippet.thumbnails.high.url}
                            alt="thumbnail"
                        />
                        <div className="home-duration">
                            {formatDuration(video.contentDetails.duration)}
                        </div>
                    </div>
                    <div className="home-below-tn">
                        <img
                            className="home-channel-avatar"
                            // src={video.snippet.thumbnails.high.url}
                            src={
                                // allChannels.items[1].snippet.thumbnails.default
                                //     .url
                                allChannels.items[
                                    getAvatarForChannelId(channelIDs[index])
                                ]?.snippet.thumbnails.default.url
                            }
                            alt="channel-avatar"
                        />
                        <div className="home-video-info">
                            <h2>{video.snippet.title}</h2>
                            <p>{video.snippet.channelTitle}</p>
                            {/* {console.log(
                                allChannels.items[
                                    getAvatarForChannelId(channelIDs[index])
                                ]
                                // ?.snippet.thumbnails.default.url
                            )} */}
                            {/* {channelIDs[index]} -- */}
                            {/* {allChannels.items[index].etag} */}
                            {
                                // allChannels.items[index]?.snippet.thumbnails
                                //     .default.url
                                // allChannelsIDs.findIndex(
                                //     checkId(channelIDs[index])
                                // )
                                // getAvatarForChannelId(channelIDs[index])
                            }
                            <p>
                                {formatNumber(video.statistics.viewCount)} • {}
                                {calculateTimeDifference(
                                    video.snippet.publishedAt
                                )}
                            </p>
                        </div>
                    </div>
                </article>
            ))}
            {/* {getData} */}
        </div>
    );
}
