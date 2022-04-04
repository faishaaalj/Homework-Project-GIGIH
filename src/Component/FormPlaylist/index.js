const FormPlaylist = ()=> {
    return(
        <form className="form-playlist">
            <label htmlFor="title">Playlist Title</label>
            <input 
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            />
            <label htmlFor="description">Description</label>
            <textarea 
            id="description"
            type="textarea"
            name="description"
            placeholder="Description"
            />
            <button className="btn-submit">Submit</button>
        </form>
    )
}

export default FormPlaylist;