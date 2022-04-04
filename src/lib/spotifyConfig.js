import config from "./config";
import axios from "axios";

const getTracks = async (text, token) => {
    const response = await axios.get(
        `${config.SPOTIFY_API_URL}search?type=track&q=${text}&limit=10`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        }
        
    )
    return response.data;
}

export {getTracks};