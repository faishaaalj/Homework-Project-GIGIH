import userEvent from "@testing-library/user-event"
import React, { useState } from "react";

const SongInfo = ({title, artist, url, toggleSelect}) => {
    const [selected, setSelected] = useState(false);
    const handleSelect = ()=> {
        setSelected(!selected);
        toggleSelect();
    }
    return (
        <div>
            <img src={url} />
            <p className="title">{title}</p>
            <p className="artist">{artist}</p>
            {selected? (
                <button onClick={handleSelect} className="btn-selected">DESELECT</button>
            ) : <button onClick={handleSelect} className="btn">SELECT</button> }
            
        </div>
    )
}

export default SongInfo;