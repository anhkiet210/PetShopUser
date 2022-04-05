import React, { useState } from "react";
import { useSelector } from "react-redux";
import './myaccount.css'

const Profile = () => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [tel, setTel] = useState()
    const [birth, setBirth] = useState()
    const [gender, setGender] = useState()
    
    const currentUser = useSelector(state => state.user.currentUser)
    console.log(currentUser);

    return(
        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
            <div className="profile">
                <h2 className="my-account__title">Thông tin tài khoản</h2>
                <form autoComplete="off">
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="name">Họ tên</label>
                        <input 
                            type="text"
                            className="input"
                            required
                            id="name"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="email">Email</label>
                        <input 
                            type="email"
                            className="input"
                            required
                            id="email"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="tel">Số điện thoại</label>
                        <input 
                            type="tel"
                            className="input"
                            required
                            id="tel"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="birth">Ngày sinh</label>
                        <input 
                            type="date"
                            className="input"
                            required
                            id="birth"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="gender">Giới tính:</label>
                        <input 
                            type="radio"
                            className="input-gender"
                            required
                            id="gender"
                            value="Nam"
                            name="gender"
                        /> Nam
                        <input 
                            type="radio"
                            className="input-gender"
                            required
                            id="gender"
                            name="gender"
                        /> Nữ
                    </div>
                    <div className="group-ip">
                        <input 
                            type="submit"
                            value="Cập nhật"
                            className="primary-btn"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Profile;