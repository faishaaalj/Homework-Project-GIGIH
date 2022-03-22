import React from "react";
import './Title.css';

function title() {
    return (
        <div className="container">
            <div className="title-container">
                <img src="https://i.scdn.co/image/ab67616d00001e02e8b066f70c206551210d902b" />
                <div>
                    <form>
                        <p className="title">Bohemian Rhapsody (The Original Soundtrack)</p>
                        <p className="artist">Queen</p>
                        <button>SELECT</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default title;