import React from "react";

const Loader = (props) => {
    return (
        <div className="loader_wrap">
            <div className="bouncingLoader"></div>
            <p className="loader_text">{props.text}</p>
        </div>
    );
};

export default Loader;
