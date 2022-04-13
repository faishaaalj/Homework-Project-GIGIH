import React, { useState } from "react";
import { getTracks } from "../../lib/spotifyConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";




const Search = ({searchResult}) => {
    const token = useSelector((state) => state.auth.token);
    
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
                {/* <input onChange={handleInput} className="search" type="text" placeholder="Search Track"></input>
                <button className="btn-submit">Submit</button> */}
                <TextField 
                onChange={handleInput} 
                id="outlined-basic" 
                variant="standard" 
                />
                <Button variant="contained" color="success">Success</Button>
            </form>
        </>
    )
}

export default Search;