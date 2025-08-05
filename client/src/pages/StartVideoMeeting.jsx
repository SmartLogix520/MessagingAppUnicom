import React from "react";
import { v1 as uuid } from "uuid";

const StartVideoMeeting = () => {
    function start() {
        const id = uuid();
        window.location.href = `/video-meeting/${id}`;
    }

    return (
        <button className="bg-blue-600" onClick={start}>Create video meeting</button>
    );
};

export default StartVideoMeeting;
