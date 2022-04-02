const Playlist = ()=> {
    return(
        <form>
            <label htmlFor="title">Playlist Title</label>
            <input 
            id="title"
            type="text"
            name="title"
            placeholder="title"
            />
            <label htmlFor="description">Description</label>
            <input 
            id="description"
            type="text"
            name="description"
            placeholder="description"
            />
            <button className="btn-submit">Submit</button>
        </form>
    )
}

export default Playlist;