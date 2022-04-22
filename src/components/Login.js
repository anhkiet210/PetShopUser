import React, { useState } from "react";
import '../css/login.css'
import { Link, Navigate } from "react-router-dom";
import Loading from "./UI/Loading";
import { useDispatch } from "react-redux";
import axios from "axios";
import UserSlice from "../redux/userSlice";

const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [err, setErr] = useState(false)
    const dispatch = useDispatch()

    const user = {
        "email": email,
        "password": password
    }

    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    const getEmail = (e) => {
        setEmail(e.target.value.trim())
    }

    const getPasword = (e) => {
        setPassword(e.target.value.trim())
    }

    const LoginAPI = async () =>{
        try{
            setLoading(true)
            const res = await axios.post("https://petshop347.herokuapp.com/api/auth/login", user)
            const resUser = await res.data.user
            const token = await res.data.accessToken
            const {_id, name, birth, email, phone, gender, permission} = resUser
            dispatch(UserSlice.actions.loginSuccess({_id, name, birth, email, phone, gender, permission}))
            // localStorage.setItem("currentUser", JSON.stringify({_id: resUser._id, name: resUser.name, birth: resUser.birth, email: resUser.email, phone: resUser.phone, gender: resUser.gender, permission: resUser.permission}))
            localStorage.setItem("accessToken", token)
            setLoading(false);
            <Navigate to="/" />
        }catch(err){
            setLoading(false)
            setErr(true)
            console.log(err);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        LoginAPI()
    }

    return loading ? <Loading /> :(
        <div className="container">
            <div className="row clearfix">
                <div className="wraper">
                    <div className="login shared">
                        <h3>Đăng nhập</h3>
                        <form action="true" autoComplete="off" id="form-dn" onSubmit={ (e) => handleSubmit(e)}>
                            <input 
                                type="email" 
                                className="input" 
                                name="email" 
                                placeholder="Email" 
                                required 
                                onChange={ (e) => getEmail(e)}
                            />
                            <div className="form-pass">
                                <input 
                                    type={showPass ? "text" : "password"} 
                                    className="input" 
                                    name="password" 
                                    placeholder="Password" 
                                    minLength={8}
                                    required 
                                    onChange={(e) => getPasword(e)}
                                />
                                <label className="label-show-pass" htmlFor="show-pass"onClick={() => handleShowPass()}><i className="fas fa-eye"></i></label>
                            </div>
                            { err && <p style={{ color: '#ff4d4d', marginBottom: '15px', fontWeight: 'bold' }}>Email hoặc mật khẩu không đúng</p>}
                            <input type="submit" id="dangnhap" name="dangnhap" value="Đăng nhập" />
                        </form>
                        {/* <p >*Nếu chưa tạo tài khoản hãy chọn*</p> */}
                        {/* <p >*Nếu chưa tạo tài khoản hãy chọn* <button id="btn-show" class="btn-show" onClick={() => alert("abc")}>Đăng ký</button></p> */}
                        <p>Nếu chưa tạo tài khoản hãy chọn <Link to="/register" className="btn-show">Đăng ký</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;