import React, { useEffect, useState } from "react";
import './style.css';
import SongInfo from "../../Component/SongInfo";
import Search from "../../Component/SearchBar";
import Playlist from "../../Component/FormPlaylist";
import config from "../../lib/config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { getProfile } from "../../lib/spotifyConfig";






const Home = () => {
   
    const [user, setUser] = useState({})
    const [tracks, setTracks] = useState([]);
    const [selectedTrackUri, setSelectedTrackUri] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState([]);
    const [token, setToken] = useState("")
    const [login, setLogin] = useState(false);

    useEffect(() => {
        const access_token = new URLSearchParams(window.location.hash).get('#access_token');

        if (access_token !== null) {
            setToken(access_token)
            setLogin(access_token !== null);

            const userProfile = async ()=> {
                try {
                    const response = await getProfile(access_token);
                    setUser(response);
                } catch(e) {
                    toast.error(e);
                } 
            }

            userProfile();
        } 
    }, []);

    const authorization = ()=> {
        return `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_KEY}&redirect_uri=http://localhost:3000&response_type=token&scope=${config.SPOTIFY_SCOPE}`
    }
    const searchResultSuccess = (data) => {
        const selectedTracks = data.filter(
            (track) => selectedTrackUri.includes(track.uri)
        );

       setTracks([...new Set([...selectedTracks, ...data])]);
    }

    const toggleSelect = (track) => {
        const uri = track.uri;

        if (selectedTrackUri.includes(uri)) {
            setSelectedTrackUri(selectedTrackUri.filter((item) => item !== uri));
            setSelectedTrack(selectedTrack.filter((item)=> item.uri !== uri))

        } else {
            setSelectedTrackUri([...selectedTrackUri, uri]);
            setSelectedTrack([...selectedTrack, track]);
        }


    };
    const logOut = () => {
        setToken("")
        setLogin(false)
    }

    console.log(selectedTrackUri)
    return (
        <div>
            <ToastContainer />
            {!login && (
                <div className="login-container">
                    <h2>Please Login</h2>
                    <a href={authorization()}>Login</a>
                </div>
            )}

            {login && (
                <div className="home-container">
                    <div className="button-container">
                        <a onClick={logOut}>Logout</a>
                        <h3>Search Track Here</h3>
                        <div>
                            <Search token={token} searchResult={(tracks) => searchResultSuccess(tracks)} />
                        </div>
                        {tracks.length > 0 && (
                            <div className="playlist-container">
                                <h2>Create Playlist</h2>
                                <Playlist token={token} userId={user.id} uri={selectedTrackUri} />
                            </div>
                        )}

                    </div>
                    <div className="container" >
                        {tracks.map(e => (
                            <div className="wrapper">
                                <div className="title-container">
                                    <SongInfo 
                                    key={e.uri} 
                                    url={e.album.images[1].url} 
                                    title={e.name} 
                                    artist={e.artists[0].name} 
                                    toggleSelect={() => toggleSelect(e)}
                                    select = {selectedTrackUri.includes(e.uri)} 
                                    />
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