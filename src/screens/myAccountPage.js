import React, { useEffect, useState } from "react";
import ChangePassword from "../components/myAccount/changePass";
import Profile from "../components/myAccount/profile";
import Loading from "../components/UI/Loading";
import { getProfile } from "../redux/callApi";

const MyAccountPage = () => {
    const [loading, setLoading] = useState(true)
    const [currentUser,setCurrentUser] = useState()
    const tokenLocal = localStorage.getItem("accessToken")
    const header = {x_authorization: tokenLocal}
    
    useEffect( () => {
        getProfile(setCurrentUser, header, setLoading)
    },[tokenLocal])

    // console.log(currentUser);

    return loading ? <Loading /> : (
        <div className="container">
            <div className="row clearfix">
                <Profile 
                    infoUser = {currentUser}
                />
                <ChangePassword />
            </div>
        </div>
    )
}

export default MyAccountPage;