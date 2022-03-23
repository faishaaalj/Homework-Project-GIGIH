const SongInfo = ({title, artist}) => {
    return (
        <div>
            <form>
                <p className="title">{title}</p>
                <p className="artist">{artist}</p>
                <button>SELECT</button>
            </form>
        </div>
    )
}

export default SongInfo;