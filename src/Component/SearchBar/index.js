import React, { useState } from "react";
const Search = ({token, searchResult}) => {
    const [text, setText] = useState("")

    const getTracks = async (e) => {
        e.preventDefault()
        const tracks = await fetch(
            `https://api.spotify.com/v1/search?q=${text}&type=track&limit=8`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        ).then((response) => response.json());
        const data = tracks.tracks.items
        searchResult(data);
    }
    
    const handleInput = (e) => {
        setText(e.target.value)
    }
    
    return (
        <form onSubmit={getTracks}>
            <input onChange={handleInput} className="search" type="text" placeholder="Search Track"></input>
            <button className="btn-submit">Submit</button>
        </form>
    )
}

export default Search;