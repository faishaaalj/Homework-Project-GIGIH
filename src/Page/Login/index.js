import React from "react";
import config from "../../lib/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpotify } from "@fortawesome/free-brands-svg-icons";

const Login = () => {


    const authorization = () => {

        const webUrl = window.location.origin
        return `https://accounts.spotify.com/authorize?client_id=${process.env.REACT_APP_SPOTIFY_KEY}&redirect_uri=${webUrl}&response_type=token&scope=${config.SPOTIFY_SCOPE}`
    }

    return (
        <>
            <div className="login-container">
                <h2>Welcome !</h2>
                <h5>Please login with your spotify account before accessing the app.</h5>
                
                <i className="fa fa-spotify"></i>
                <a href={authorization()}>
                    <FontAwesomeIcon icon={faSpotify} className="spotify-icon" />   
                    Login  
                </a>
                <p>Made by faishallj</p>
            </div>
        </>
    )
}

export default Login;