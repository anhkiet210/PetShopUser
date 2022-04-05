import React, { useEffect } from "react";
import ChangePassword from "../components/myAccount/changePass";
import Profile from "../components/myAccount/profile";

const MyAccountPage = () => {

    return (
        <div className="container">
            <div className="row clearfix">
                <Profile />
                <ChangePassword />
            </div>
        </div>
    )
}

export default MyAccountPage;