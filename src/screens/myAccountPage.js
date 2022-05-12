import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "../components/myAccount/changePass";
import Profile from "../components/myAccount/profile";
import Loading from "../components/UI/Loading";
import { getProfile } from "../redux/callApi";

const MyAccountPage = () => {
    const [loading, setLoading] = useState(true)
    const tokenLocal = localStorage.getItem("accessToken")
    const header = { x_authorization: tokenLocal }

    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)

    useEffect(() => {
        getProfile(dispatch, header, setLoading)
    }, [tokenLocal])

    return loading ? <Loading /> : (
        <div className="container">
            <div className="row clearfix">
                {
                    currentUser &&
                    <Profile
                        infoUser={currentUser}
                    />
                }
                {
                    currentUser &&
                    <ChangePassword 
                        currentPass={currentUser?.password}
                        id={currentUser?._id}
                    />
                }
            </div>
        </div>
    )
}

export default MyAccountPage;