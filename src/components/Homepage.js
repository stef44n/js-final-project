import React, { useEffect, useState } from "react";
import "../styles/Homepage.css";
import mockData from "../testData/mockDataTest";
// require(`dotenv`).config();
import API_KEY from "../testData/apikey";

export default function Homepage() {
    // const [apiData, setApiData] = useState({});
    const [apiData, setApiData] = useState(mockData.items);

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
            console.log(API_KEY);
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

    useEffect(() => {
        // Make the API call and set the data state
        // Replace 'apiEndpoint' with your actual API endpoint
        // fetch("apiEndpoint")
        //     .then((response) => response.json())
        //     .then((result) => setData(result))
        //     .catch((error) => console.error(error));
    }, []);

    return (
        <div className="yt-grid">
            {apiData.map((video, index) => (
                <article key={index}>
                    <img
                        className="thumbnail"
                        // src={`${getData()}`}
                        src={video.snippet.thumbnails.high.url}
                        alt="thumbnail"
                    />
                    <div className="below-tn">
                        <img
                            className="channel-avatar"
                            src={video.snippet.thumbnails.high.url}
                            alt="channel-avatar"
                        />
                        <div className="video-info">
                            <h2>{video.snippet.title}</h2>
                            <p>{video.snippet.channelTitle}</p>
                            <p>View count / Release date</p>
                        </div>
                    </div>
                </article>
            ))}
            {/* {getData} */}
        </div>
    );
}

// {
/* <div className="yt-grid">
    {apiData.map((video, index) => (
        <article key={index}>
            <img
                className="thumbnail"
                // src={`${getData()}`}
                src={video.snippet.thumbnails.high.url}
                alt="thumbnail"
            />
            <div className="below-tn">
                <div className="channel-avatar">ava</div>
                <div className="video-info">
                    <h2>{video.snippet.title}</h2>
                    <p>{video.snippet.channelTitle}</p>
                    <p>View count / Release date</p>
                    <p>{video.snippet.description}</p>
                </div>
            </div>
        </article>
    ))}
    {getData}
</div>; */
// }
