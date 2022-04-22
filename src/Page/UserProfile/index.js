import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const UserProfile = ({home})=> {
    const user = useSelector((state) => state.auth.user);
    
    return(
        <div className="user-container">
            <div className="back-container">
                <Link className="link-profile" to={home}>
                    <p className="back-button">
                        <FontAwesomeIcon icon={faArrowLeft} className="back-icon" />
                        BACK
                    </p>
                </Link>
            </div>

            <div className="user-info-container">
                <img  src={user?.images[0]?.url} alt="profile"></img>
                <div className="user-detail">
                    <div className="info">
                        <span className="label">Username</span>
                        <span className="value">{user?.display_name}</span>
                    </div>
                    <div className="info">
                        <span className="label">Followers  </span>
                        <span className="value">{user?.followers.total}</span>
                    </div>
                    <div className="info">
                        <span className="label">Type</span>
                        <span className="value">{user?.type}</span>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default UserProfile;