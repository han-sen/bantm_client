import React from "react";

const Loader = (props) => {
    return (
        <div className="loader_wrap">
            <div className="bouncingLoader">
                <div></div>
            </div>
            <p className="loader_text">{props.text}</p>
        </div>
    );
};

export default Loader;
