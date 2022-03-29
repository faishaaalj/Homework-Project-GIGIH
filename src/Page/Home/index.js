import React from "react";
import './style.css';
import SongInfo from "../../Component/SongInfo";
import { Component } from "react";

class Home extends Component {
    client_id = process.env.REACT_APP_SPOTIFY_KEY
    redirect_uri = "http://localhost:3000"
    url = 'https://accounts.spotify.com/authorize';
    response_type = "token"
    scope = "playlist-modify-private"
    auth = `${this.url}?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=${this.response_type}&scope=${this.scope}`

    hash = window.location.hash;
    token = this.hash.split("&")[0].split('=')[1]

    state = {
        tracks: [],
        text: "",
        token: this.token
    }
    getTracks = async (e) => {
        e.preventDefault()
        const tracks = await fetch(
            `https://api.spotify.com/v1/search?q=${this.state.text}&type=track&limit=8`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        }
        ).then((response) => response.json());
        this.setState({ tracks: tracks.tracks.items })
        console.log(tracks.tracks.items)
    }

    handleInput = (e) => {
        this.setState({ text: e.target.value })
    }

    logOut = () => {
        this.setState({token: ""})
    } 
    render() {
        return (
            <div >
                {!this.state.token ?
                    <div className="button-container">
                        <a href={this.auth}>Login</a>
                    </div>

                    : <div className="button-container"> <a onClick={this.logOut}>Logout</a> </div>}

                {this.state.token ?
                    <div>
                        <div className="button-container">
                            <h3>Search Track Here</h3>
                            <div>
                                <form onSubmit={this.getTracks}>
                                    <input onChange={this.handleInput} className="search" type="text" placeholder="Search Track"></input>
                                    <button>Submit</button>
                                </form>
                            </div>
                        </div>
                        <div className="container" >
                            {this.state.tracks.map(e => (
                                <div className="wrapper">
                                    <div className="title-container">
                                        <SongInfo url={e.album.images[1].url} title={e.name} artist={e.artists[0].name} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    : <div className="button-container"><h2>Please Login</h2></div>}
            </div>
            


                    




        )
    }

}

export default Home;