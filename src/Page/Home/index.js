import React from "react";
import './style.css';
import SongInfo from "../../Component/SongInfo";
import dataAlbum from "../../data/dataAlbum";

function Home() {
    return (
        <div className="container">
            {dataAlbum.map(e => (
                <div className="wrapper"> 
                    <div className="title-container">
                        <SongInfo url={e.album.images[1].url} title={e.name} artist={e.artists[0].name} />
                    </div>
                </div>
            ))} 
        </div>

        
        
    )
}

export default Home;