import React, { useState, ChangeEventHandler, FormEventHandler } from "react";
import { getTracks } from "../../lib/spotifyConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSelectorType } from "../../store";
import { ResponseTracks, Track } from "../../types/track"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface Props {
    searchResult: (tracks: Track[]) => void;
}

const Search: React.FC<Props> =  ({searchResult}) => {
    const token: string = useSelectorType((state) => state.auth.token);
    
    const [text, setText] = useState<string>("");

    const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        setText(e.target.value)
    }
    const searchTracks: FormEventHandler<HTMLDivElement> & FormEventHandler<HTMLFormElement> = async(e)=> {
        e.preventDefault()

        try {
            const data: ResponseTracks = await getTracks(text, token)
            const tracks: Track[] = data.tracks.items;
            searchResult(tracks);

        } catch (e) {
            toast.error("Error when getting tracks, make sure you have logged in");
        }

    }
    return (
        <>  
            <ToastContainer />
            <form onSubmit={searchTracks}>
                <input data-testid="input-search" onChange={handleInput} className="search" type="text" placeholder="Search Track"></input>
                <button data-testid="button-search" className="btn-submit">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        </>
    )
}

export default Search;