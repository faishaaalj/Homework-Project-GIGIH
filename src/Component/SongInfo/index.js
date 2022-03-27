const SongInfo = ({title, artist, url}) => {
    return (
        <div>
            <form>
                <img src={url} />
                <p className="title">{title}</p>
                <p className="artist">{artist}</p>
                <button>SELECT</button>
            </form>
        </div>
    )
}

export default SongInfo;