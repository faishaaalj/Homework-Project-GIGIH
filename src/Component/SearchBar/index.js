import React, { useState } from "react";
import { getTracks } from "../../lib/spotifyConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Search = ({token, searchResult}) => {
    const [text, setText] = useState("")

    const handleInput = (e) => {
        setText(e.target.value)
    }
    const searchTracks = async(e)=> {
        e.preventDefault()

        try {
            const data = await getTracks(text, token)
            const tracks = data.tracks.items;
            searchResult(tracks);

        } catch (e) {
            toast.error(e);
        }

    }    
    return (
        <>  
            <ToastContainer />
            <form onSubmit={searchTracks}>
                <input onChange={handleInput} className="search" type="text" placeholder="Search Track"></input>
                <button className="btn-submit">Submit</button>
            </form>
        </>
    )
}

export default Search;