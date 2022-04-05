import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../UI/Loading';
import CartDropdown from './CartDtopdown';
import UserSlice from '../../redux/userSlice';
import { getProfile } from '../../redux/callApi';

const Header = () => {
    const [loading, setLoading] = useState(true)
    const [currentUser,setCurrentUser] = useState()
    const tokenLocal = localStorage.getItem("accessToken")
    const [showCart, setShowCart] = useState(false)
    const dispatch = useDispatch()
    const header = {x_authorization: tokenLocal}

    useEffect( () => {
        getProfile(setCurrentUser, header, setLoading)
    },[tokenLocal])

    const handleShowCart = () => {
        setShowCart(!showCart)
    }

    const handleLogout = () => {
        setLoading(true)
        dispatch(UserSlice.actions.logout(currentUser))
        localStorage.removeItem("accessToken")
        setLoading(false);
        // <Navigate to="/" />
        window.location.href="/"
    }

    return (
        <>
            {loading && <Loading />}
            <div className="container-fluid" style={{backgroundColor: '#1E1F29'}}>
                <div className="container">
                    <div className="row clearfix">
                        <div className="top__header">
                            <ul className="top__header-link">
                                <li><a href="#"><i className="fa fa-phone" /> 0365480118</a></li>
                                <li><a href="#"><i className="far fa-envelope" /> PetShop@email.com</a></li>
                                <li><a href="#"><i className="fa fa-map-marker" /> Cần Thơ</a></li>
                            </ul>
                            {
                                currentUser ?
                                <ul className="top__header-link ">
                                    <li>
                                        <i className="far fa-user" />  <Link to="/my-account">{currentUser && currentUser.name}</Link>
                                    </li>
                                </ul> :
                                <ul className="top__header-link ">
                                    <li>
                                        <i className="far fa-user" />  Bạn chưa đăng nhập
                                    </li>
                                </ul>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="main__header">
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <Link to="/">
                                <img src={logo} className="header__logo" alt="Logo Pet Shop" />
                            </Link>
                        </div>
                        <div className="col-6 header__search">
                            <div className="header__search-group">
                                <form action="true">
                                    <input type="text" className="header__search-input" placeholder="Tìm kiếm..." />
                                    <button type="submit" className="header__search-btn">
                                        <i className="far fa-search" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-3 header__cart">
                            <div className="cart">
                                <button className="cart__link" onClick={() => handleShowCart()}>
                                    <i className="fal fa-cart-plus" />  Giỏ hàng
                                    <div className="sqy">0</div>
                                </button>
                                { currentUser && showCart && <CartDropdown />}
                            </div>
                            {
                                !currentUser ? 
                                <Link to="/login" className="header__login">
                                    <i className="far fa-user" /> 
                                    Đăng nhập
                                </Link> :
                                <button className="header__login" onClick={() => handleLogout()}>
                                    <i className="fas fa-sign-out"></i> Logout
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;