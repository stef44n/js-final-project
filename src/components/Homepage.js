import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import mockData from "../testData/mockDataTest";
import mockDataAllChannelsOnDisplay from "../testData/mockDataAllChannelsOnDisplay";
// require(`dotenv`).config();
// import API_KEY from "../testData/apikey";
import {
    formatNumber,
    calculateTimeDifference,
    formatDuration,
} from "./HelperFunctions";

export default function Homepage() {
    // const [apiData, setApiData] = useState({});
    const [apiData, setApiData] = useState(mockData.items);

    const allChannels = mockDataAllChannelsOnDisplay;

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
    console.log(channelIDs);
    // console.log(typeof channelIDs);

    const commaSeparatedString = channelIDs.join(",");

    console.log(commaSeparatedString);
    console.log(
        mockDataAllChannelsOnDisplay.items[0].brandingSettings.channel.title
    );
    const allChannelsIDs = allChannels.items.map((video) => video.id);
    console.log(allChannelsIDs);

    const [initialArray] = useState(channelIDs);
    const [secondArray, setSecondArray] = useState(allChannelsIDs);
    console.log(initialArray);
    console.log(secondArray);

    const getAvatarForChannelId = (channelId) => {
        console.log(channelId);
        const matchedAvatarIndex = secondArray.findIndex(
            (avatar) => avatar === channelId
        );
        console.log(matchedAvatarIndex);
        // return matchedAvatarIndex ? matchedAvatarIndex.id : "";
        // return channelId;
        return matchedAvatarIndex;
    };

    const getData = async () => {
        try {
            // REPLACE HAZARD with search term
            // const response = await fetch(
            //     `https://www.googleapis.com/youtube/v3/search?key=API_KEY&q=hazard&type=video&part=snippet`,
            // `https://www.googleapis.com/youtube/v3/search?key=API_KEY&q=hazard&type=video&part=snippet&maxResults=15`,
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
            console.log(searchData);
            // console.log(API_KEY);
            console.log(process.env);
            // console.log(youTubeId);
            // console.log(channelName);
            // console.log(videoTitle);
            // console.log(videoDescription);
            // console.log(videoReleaseDate);
            // console.log(videoThumbnailURL);
            console.log(searchData.items);
            console.log(searchData.items[0]);
            console.log(searchData.items[0].snippet.thumbnails.high.url);

            // const thumbnailImage =
            //     searchData.items[0].snippet.thumbnails.high.url;

            // return thumbnailImage;
            // return searchData;
        } catch (err) {
            console.error(err);
        }
    };
    getData();
    // console.log(getData());

    // useEffect(() => {
    // Make the API call and set the data state
    // Replace 'apiEndpoint' with your actual API endpoint
    // fetch("apiEndpoint")
    //     .then((response) => response.json())
    //     .then((result) => setData(result))
    //     .catch((error) => console.error(error));
    // }, []);

    return (
        <div className="home-yt-grid">
            {apiData.map((video, index) => (
                <article className="home-article" key={index}>
                    {/* {console.log(video.snippet.channelId)} */}
                    {console.log(
                        getAvatarForChannelId(video.snippet.channelId)
                    )}
                    <div className="home-video-thumbnail">
                        <img
                            className="home-thumbnail"
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
