import React, { useState } from "react";
import './style.css';
import SongInfo from "../../Component/SongInfo";
import Search from "../../Component/SearchBar";




const Home = () => {
    const client_id = process.env.REACT_APP_SPOTIFY_KEY
    const redirect_uri = "http://localhost:3000"
    const url = 'https://accounts.spotify.com/authorize';
    const response_type = "token"
    const scope = "playlist-modify-private"
    const auth = `${url}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}&scope=${scope}`
    const access_token = window.location.hash.split("&")[0].split('=')[1]

    const [tracks, setTracks] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState([]);
    const [token, setToken] = useState(access_token)


    const searchResultSuccess = (data)=> {
        const selectedTracks = filterSelectedTracks();
        const notSelectedTrack = data.filter(
            (track) => !selectedTrack.includes(track.uri)
        );

        setTracks([...selectedTracks, ...notSelectedTrack])

    }

    const filterSelectedTracks = ()=> {
        return tracks.filter((track) => selectedTrack.includes(track.uri))
    }
    const toggleSelect = (track) => {
        const uri = track.uri;

        if(selectedTrack.includes(uri)) {
            setSelectedTrack(selectedTrack.filter((item) => item !== uri));
        } else {
            setSelectedTrack([...selectedTrack, uri]);
        }


    };
    const logOut = () => {
        setToken("")
    }
    return (
        <div >
            {!token && (
                <div className="login-container">
                    <h2>Please Login</h2>
                    <a href={auth}>Login</a>
                </div>
            )}

            {token && (
                <div className="home-container">
                    <div className="button-container">
                        <a onClick={logOut}>Logout</a>
                        <h3>Search Track Here</h3>
                        <div>
                            <Search token={token} searchResult={(tracks) => searchResultSuccess(tracks)}/>
                        </div>
                    </div>
                    <div className="container" >
                        {tracks.map(e => (
                            <div className="wrapper">
                                <div className="title-container">
                                    <SongInfo  key={e.uri} url={e.album.images[1].url} title={e.name} artist={e.artists[0].name} toggleSelect={()=> toggleSelect(e)} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home;