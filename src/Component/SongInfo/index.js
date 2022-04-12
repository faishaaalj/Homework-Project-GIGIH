import React, { useState } from "react";

const SongInfo = ({title, artist, url, toggleSelect, select}) => {
    const [selected, setSelected] = useState(select);
    const handleSelect = ()=> {
        setSelected(!selected);
        toggleSelect();
    }
    return (
        <div className="song-container">
            <div>
                <img src={url} alt="cover" />
            </div>
            <div className="info-container">
                <div className="info-wrapper">
                    <p className="title">{title}</p>
                    <p className="artist">{artist}</p>
                </div>
                <div>
                    {selected? (
                        <button onClick={handleSelect} className="btn-selected">DESELECT</button>
                    ) : <button onClick={handleSelect} className="btn">SELECT</button> }
                </div>
            </div>
        </div>
    )
}

export default SongInfo;