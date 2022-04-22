import React from "react"
import { useState } from "react";
import SongInfo from "../../Component/SongInfo"
import Search from "../../Component/SearchBar";
import Playlist from "../../Component/FormPlaylist";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../accountSlice";
import { Link } from "react-router-dom";




const CreatePlaylist = ({ profile }) => {
    const [tracks, setTracks] = useState([]);
    const [selectedTrackUri, setSelectedTrackUri] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

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
            setSelectedTrack(selectedTrack.filter((item) => item.uri !== uri))

        } else {
            setSelectedTrackUri([...selectedTrackUri, uri]);
            setSelectedTrack([...selectedTrack, track]);
        }

    };

    return (
        <>
            <div className="navbar">
                <div className="user-profile">
                    <Link className="link-style" to={profile}>
                        <img src={user?.images[0]?.url} alt="profile" ></img>
                        <p><span>{user?.display_name}</span></p>
                    </Link>

                </div>
                <div className="logout-button">
                    <button className="logout-link" onClick={() => dispatch(logout())}>Logout</button>
                </div>

            </div>
            <div className="home-container">
                <div className="button-container">
                    <h3>Search Track Here</h3>
                    <div>
                        <Search searchResult={(tracks) => searchResultSuccess(tracks)} />
                    </div>
                    {selectedTrack.length > 0 && (
                        <>
                            <button className="floating-item" onClick={() => setIsOpen(true)}>Create Playlist ({selectedTrack.length} items) </button>
                            <Playlist open={isOpen} uri={selectedTrackUri} onClose={() => setIsOpen(false)} />
                        </>
                    )}
                    <div className="container" >
                        {tracks.length > 0 && (
                            tracks.map(e => (
                                <div className="wrapper">
                                    <div className="title-container">
                                        <SongInfo
                                            key={e.uri}
                                            url={e.album.images[1].url}
                                            title={e.name}
                                            artist={e.artists[0].name}
                                            toggleSelect={() => toggleSelect(e)}
                                            select={selectedTrackUri.includes(e.uri)}
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
                <p className="footer">Made by faishallj</p>

            </div>
        </>
    )
}

export default CreatePlaylist;