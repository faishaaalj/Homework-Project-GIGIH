import React, { useState } from "react";
import { createPlaylist, addTracksToPlaylist } from "../../lib/spotifyConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux";


const FormPlaylist = ({ uri, open, onClose }) => {
    const token = useSelector((state) => state.auth.token);
    const userId = useSelector((state) => state.auth.user?.id);

    
    const [text, setText] = useState({
        title: "",
        description: "",
    })


    const handleInput = (e) => {
        const { name, value } = e.target;

        setText({ ...text, [name]: value })

    }

    console.log(text)


    const formValidation = () => {
        let isValid = true;

        if (text.title.length <= 10) {
            isValid = false;
        }

        return isValid;

    }

    if (!open) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formValidation()) {
            if (uri.length > 0) {
                try {
                    const response = await createPlaylist(token, userId, { 
                        name: text.title, 
                        description: text.description 
                    });
                    await addTracksToPlaylist(
                        token,
                        response.id,
                        uri,
                    );
                    toast.success("Playlist has been created");
                    setText({
                        title: "",
                        description: "",
                    })
                    onClose();
                } catch (e) {
                    toast.error(e);
                }
            } else {
                toast.error("Please select a track")
            }
        } else {
            toast.error("Title must be atleast 10 character")
        }
    }

    return (
        <>
            <div className="modal-overlay" />
            <div className="playlist-container">  
                <span data-testid="exit" onClick={onClose} className="exit">X</span>
                <span data-testid="title-form" className="title">Create Playlist</span>    
                <form className="form-playlist" onSubmit={handleSubmit}>
                    <label data-testid="label-title" htmlFor="title">Playlist Title</label>
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleInput}
                        required
                        data-testid="form-title"
                    />
                    <label data-testid="label-description" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        type="textarea"
                        name="description"
                        placeholder="Description"
                        onChange={handleInput}
                        required
                        data-testid="form-description"
                    />
                    <button data-testid="button-submit" className="btn-submit">Submit</button>
                </form>
            </div>
        </>
    )
}

export default FormPlaylist;