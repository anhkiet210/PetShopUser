import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import './myaccount.css'

const Profile = (props) => {

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [birth, setBirth] = useState()
    const [gender, setGender] = useState()

    useEffect( () => {
        setName(props.infoUser?.name)
        setEmail(props.infoUser?.email)
        setPhone(props.infoUser?.phone)
        setBirth(props.infoUser?.birth)
        setGender(props.infoUser?.gender)
    }) 
    console.log(name, email, phone, birth, gender);

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
                            value={name}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="email">Email</label>
                        <input 
                            type="email"
                            className="input"
                            required
                            id="email"
                            value={email}
                            readOnly
                            disabled
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="phone">Số điện thoại</label>
                        <input 
                            type="tel"
                            className="input"
                            required
                            id="phone"
                            value={phone}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="birth">Ngày sinh</label>
                        <input 
                            type="date"
                            className="input"
                            required
                            id="birth"
                            value={birth}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="gender">Giới tính:</label>
                        <input 
                            type="radio"
                            className="input-gender"
                            required
                            value={!gender ? "" : gender}
                            name="gender"
                        /> Nam
                        <input 
                            type="radio"
                            className="input-gender"
                            required
                            name="gender"
                            value={!gender ? "" : gender}
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