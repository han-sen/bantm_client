import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";

const DashUserProfile = (props) => {
    const user = useContext(UserContext);
    const [userCred, setUserCred] = useState(user);
    useEffect(() => {
        setUserCred(user);
    }, [user]);
    return (
        <div className="dash_user_profile">
            <img
                src={props.user.imageUrl}
                alt="user-pic"
                className="user_avatar"
            />
            <p>{props.user.userName}</p>
        </div>
    );
};

export default DashUserProfile;
