import React from "react";
import './myaccount.css'

const ChangePassword = () => {
    return (
        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5">
            <div className="change-pass">
            <h2 className="my-account__title">Đổi mật khẩu</h2>
                <form autoComplete="off">
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="curren-pass">Mật khẩu hiện tại</label>
                        <input 
                            type="password"
                            className="input"
                            required
                            id="curren-pass"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="new-pass">Mật khẩu mới</label>
                        <input 
                            type="password"
                            className="input"
                            required
                            id="new-pass"
                        />
                    </div>
                    <div className="group-ip">
                        <label className="my-account__label" htmlFor="comfirm-pass">Xác nhận mật khẩu mới</label>
                        <input 
                            type="password"
                            className="input"
                            required
                            id="comfirm-pass"
                        />
                    </div>
                    <p style={{ color: '#ff4d4d', marginBottom: '15px', fontWeight: 'bold' }}>Email hoặc mật khẩu không đúng</p>
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