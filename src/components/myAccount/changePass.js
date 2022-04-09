import React, { useState } from "react";
import './myaccount.css'
import Loading from "../UI/Loading";
import axios from "axios";
import bcrypt from "bcryptjs/dist/bcrypt";

const ChangePassword = (props) => {
    const [loading, setLoading] = useState(false)
    const [currentPass, setCurrentPass] = useState()
    const [newPass, setNewPass] = useState()
    const [comfirmPass, setComfirmPass] = useState()
    const [errCurrentPass, setErrCurrentPass] = useState(false)
    const [errComfirmPass, setErrComfirmPass] = useState(false)
    // console.log(props);

    //get current pass
    const getCurrentPass = (e) => {
        setCurrentPass(e.target.value.trim())
    }

    //get new pass
    const getNewPass = (e) => {
        setNewPass(e.target.value.trim())
    }

    //get comfirm pass
    const getComfirmPass = (e) => {
        setComfirmPass(e.target.value.trim())
    }

    const handleChangePass = (id, pass) => {
        var config = {
            method: 'put',
            url: `https://petshop347.herokuapp.com/api/users/reset-password/${id}`,
            data: {
                password: pass
            }
        };

        const resDate = async () => {
            try {
                setLoading(true)
                const res = await axios(config)
                setLoading(false)
                alert("Đổi mật khẩu thành công!")
            } catch (err) {
                setLoading(false)
                alert("Lỗi")
            }
        }

        resDate()
    }

    //handle submit form
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!bcrypt.compareSync(currentPass, props?.currentPass)){
            setErrCurrentPass(true)
            return
        }

        if(newPass !== comfirmPass){
            setErrComfirmPass(true)
            return
        }

        handleChangePass(props?.id, newPass)

    }
    return loading ? <Loading /> : (
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <div className="change-pass">
            <h2 className="my-account__title">Đổi mật khẩu</h2>
                <form autoComplete="off" onSubmit={(e) => handleSubmit(e)}>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="curren-pass">Mật khẩu hiện tại</label>
                        <input 
                            type="password"
                            className="input"
                            required
                            id="curren-pass"
                            onChange={(e) => getCurrentPass(e)}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="new-pass">Mật khẩu mới</label>
                        <input 
                            type="password"
                            className="input"
                            // required
                            id="new-pass"
                            minLength={8}
                            maxLength={20}
                            onChange={(e) => getNewPass(e)}
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="comfirm-pass">Xác nhận mật khẩu mới</label>
                        <input 
                            type="password"
                            className="input"
                            // required
                            id="comfirm-pass"
                            onChange={(e) => getComfirmPass(e)}
                        />
                    </div>
                    {errCurrentPass && <p style={{ color: '#ff4d4d', marginBottom: '15px', fontWeight: 'bold' }}>Mật khẩu hiện tại không đúng</p>}
                    {errComfirmPass && <p style={{ color: '#ff4d4d', marginBottom: '15px', fontWeight: 'bold' }}>Mật khẩu xác nhận không đúng</p>}
                    <div className="group-ip">
                        <input 
                            type="submit"
                            value="Đổi"
                            className="primary-btn"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword;