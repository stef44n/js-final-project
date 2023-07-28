// import "./styles/App.css";
import Navbar from "./components/Navbar";
import Searchpage from "./components/SearchPage";
import Homepage from "./components/Homepage";
import Video from "./components/Video";
import { useEffect, useState } from "react";

function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [videoData, setVideoData] = useState("");
    const [isSidebarFull, setIsSidebarFull] = useState(false);
    const [searchingFor, setSearchingFor] = useState("");

    const handleHomepageClick = (data) => {
        setCurrentPage(data.page);
        setVideoData(data.videoData);
        console.log(data);
    };

    const handleSearchPageClick = (data) => {
        setCurrentPage(data.page);
        setVideoData(data.videoData);
        console.log(data);
    };

    const handleIconClick = (data) => {
        setCurrentPage(data);
    };

    const handleSearchClick = (data) => {
        setCurrentPage(data.page);
        setSearchingFor(data.searchFor);
        // console.log(searchingFor);
        // console.log(data);
    };

    const handleSuggestionClick = (data) => {
        setCurrentPage(data.page);
        setVideoData(data.videoData);
        console.log(data);
    };

    return (
        <div className="App">
            <Navbar
                onSearchClick={handleSearchClick}
                onIconClick={handleIconClick}
                onMenuClick={setIsSidebarFull}
            />
            {currentPage === "home" && (
                <Homepage
                    onHomepageClick={handleHomepageClick}
                    isSidebarFull={isSidebarFull}
                />
            )}
            {currentPage === "search" && (
                <Searchpage
                    onSearchClick={handleSearchPageClick}
                    theSearchTerm={searchingFor}
                />
            )}
            {currentPage === "video" && (
                <Video
                    videoData={videoData}
                    onSuggestion={handleSuggestionClick}
                />
            )}
            {/* <Searchpage /> */}
            {/* <Video /> */}
        </div>
    );
}

export default App;
