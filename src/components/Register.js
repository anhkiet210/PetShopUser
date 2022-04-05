import React from "react";
import '../css/login.css'
import { useState } from "react";
import Loading from "./UI/Loading";
import axios from "axios";

const Register = () => {

    const [name, setName] = useState()
    const [email, setEmail]  = useState()
    const [password, setPassword] = useState()
    const [phone, setPhone] = useState()
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const newUser = {
        "name": name,
        "email": email,
        "password": password,
        "phone": phone
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const getName = (e) => {
        setName(e.target.value)
    }

    const getEmail = (e) => {
        setEmail(e.target.value)
    }

    const getPasword = (e) => {
        setPassword(e.target.value)
    }

    const getPhone = (e) => {
        setPhone(e.target.value)
    }

    const RegisterAPI = (user) => {
        try{
            setLoading(true)
            const reg = async () => {
                const res = await axios.post(
                    "https://petshop347.herokuapp.com/api/auth/register", user
                );
                alert("Đăng ký tài khoản thành công!");
                window.location.href="/login"
            }
            setLoading(false)
            reg()
        }catch(err){
            setLoading(false)
            setErr(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        RegisterAPI(newUser)
    }

    return loading ? <Loading /> :(
        <div className="container">
            <div className="row clearfix">
                <div className="wraper">
                    <div className="register shared">
                        <h3>Đăng ký</h3>
                        <form action="true" autoComplete="off" id="form-dn" onSubmit={(e) => handleSubmit(e)}>
                            <input 
                                type="text" 
                                className="input" 
                                name="name" 
                                placeholder="Họ tên" 
                                required 
                                onChange={(e) => getName(e)}
                            />
                            <input 
                                type="email" 
                                className="input" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                onChange={(e) => getEmail(e)}
                            />
                            <div className="form-pass">
                                <input 
                                    type={showPass ? "text" : "password"} 
                                    className="input" 
                                    name="password" 
                                    placeholder="Password" 
                                    required 
                                    onChange={(e) => getPasword(e)}
                                />
                                {/* <input 
                                    type="checkbox" 
                                    id="show-pass" 
                                    className="show-pass"
                                /> */}
                                <label className="label-show-pass" htmlFor="show-pass"onClick={() => handleShowPass()}><i className="fas fa-eye"></i></label>
                            </div>
                            <input 
                                type="tel" 
                                className="input" 
                                name="phone" 
                                placeholder="Số điện thoại" 
                                required 
                                minLength="10"
                                onChange={(e) => getPhone(e)}
                            />
                            { err && <p style={{ color: '#ff4d4d', marginBottom: '15px', fontWeight: 'bold' }}>Lỗi</p>}
                            <input type="submit" id="dangnhap" name="dangnhap" value="Đăng ký" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;