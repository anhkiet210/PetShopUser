import axios from "axios";
import React, { useState, useEffect } from "react";
import './myaccount.css'
import Loading from "../UI/Loading";

const Profile = (props) => {
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState()
    const [birth, setBirth] = useState()
    const [gender, setGender] = useState()
    const token = localStorage.getItem("accessToken")

    console.log(props);

    useEffect(() => {
        setName(props.infoUser?.name)
        setEmail(props.infoUser?.email)
        setPhone(props.infoUser?.phone)
        setBirth(props.infoUser?.birth?.slice(0, 10))
        setGender(props.infoUser?.gender)
    }, [])


    const getName = (e) => {
        setName(e.target.value.trim())
    }
    const getPhone = (e) => {
        setPhone(e.target.value.trim())
    }
    const getBirth = (e) => {
        setBirth(e.target.value)
    }
    const getGender = (e) => {
        setGender(e.target.value)
    }

    const userUpdate = JSON.stringify({
        "name": name,
        "phone": phone,
        "birth": birth,
        "gender": gender
    })

    const updateInfo = () => {
        var config = {
            method: 'put',
            url: 'https://petshop347.herokuapp.com/api/users/update-my-info',
            headers: {
                'x_authorization': token,
                'Content-Type': 'application/json'
            },
            data: userUpdate
        };

        const resDate = async () => {
            try {
                setLoading(true)
                const res = await axios(config)
                setLoading(false)
                alert("Cập nhật thông tin thành công!")
            } catch (err) {
                setLoading(false)
                alert("Lỗi")
            }
        }

        resDate()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        updateInfo()
    }

    return loading ? <Loading /> : (
        <div className="col-xs-12 col-sm-12 col-md-7 col-lg-7 col-xl-7">
            <div className="profile">
                <h2 className="my-account__title">Thông tin tài khoản</h2>
                <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="name">Họ tên</label>
                        <input
                            type="text"
                            className="input"
                            required
                            id="name"
                            defaultValue={name}
                            onChange={(e) => getName(e)}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="input"
                            required
                            id="email"
                            defaultValue={email}
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
                            maxLength="10"
                            minLength="10"
                            defaultValue={phone}
                            onChange={(e) => getPhone(e)}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="birth">Ngày sinh</label>
                        <input
                            type="date"
                            className="input"
                            required
                            id="birth"
                            defaultValue={birth}
                            onChange={(e) => getBirth(e)}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="gender">Giới tính:</label>
                        <input
                            type="radio"
                            className="input-gender"
                            required
                            value="Nam"
                            name="gender"
                            defaultChecked={gender && gender === "Nam"}
                            onChange={(e) => getGender(e)}
                        /> Nam
                        <input
                            type="radio"
                            className="input-gender"
                            required
                            name="gender"
                            defaultChecked={gender && gender === "Nữ"}
                            onChange={(e) => getGender(e)}
                            value="Nữ"
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