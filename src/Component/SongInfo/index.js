import React, { useState } from "react";

const SongInfo = ({title, artist, url, toggleSelect, select}) => {
    const [selected, setSelected] = useState(select);
    const handleSelect = ()=> {
        setSelected(!selected);
        toggleSelect();
    }
    return (
        <div>
            <img src={url} alt="cover" />
            <p className="title">{title}</p>
            <p className="artist">{artist}</p>
            {selected? (
                <button onClick={handleSelect} className="btn-selected">DESELECT</button>
            ) : <button onClick={handleSelect} className="btn">SELECT</button> }
            
        </div>
    )
}

export default SongInfo;