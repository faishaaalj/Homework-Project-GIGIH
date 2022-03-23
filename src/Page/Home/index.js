import React from "react";
import './style.css';
import AlbumCover from "../../Component/AlbumCover";
import SongInfo from "../../Component/SongInfo";

function Home() {
    const album = {
        url: "https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b",
        title: "Bohemian Rhapsody (The Original Soundtrack)",
        artist: "Queen"
    }
    return (
        <div className="container">
            <div className="title-container">
               <AlbumCover url={album.url} />
               <SongInfo title={album.title} artist={album.artist} />
            </div>
        </div>
    )
}

export default Home;