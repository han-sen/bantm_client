import React from "react";

const Progress = (props) => {
    return (
        <div className="progress_outer">
            <div
                className="progress_inner"
                style={{ width: `${props.progress}%` }}
            ></div>
        </div>
    );
};

export default Progress;
