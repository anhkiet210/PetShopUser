import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../image/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../UI/Loading';
import CartDropdown from './CartDropdown';
import UserSlice from '../../redux/userSlice';
import { getProfile, getMyCart } from '../../redux/callApi';
import axios from 'axios';
import { chuyenDoiURL } from '../../redux/changeText';

const Header = () => {
    const [loading, setLoading] = useState(false)
    const [showCart, setShowCart] = useState(false)
    const [filterCart, setFilterCart] = useState()
    const  [searchText, setSearchText] = useState('')
    // const [currentUser, setCurrentUser] = useState()
    // const [myCart, setMyCart] = useState()
    // const [listProducts, setListProducts] = useState()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const tokenLocal = localStorage.getItem("accessToken")
    const header = { x_authorization: tokenLocal }
    const currentUser = useSelector(state => state.user.currentUser)
    const listProducts = useSelector(state => state.products.listProducts) && JSON.parse(sessionStorage.getItem("listProducts"))
    const myCart = useSelector(state => state.cart.cartItem)

    useEffect(() => {
        getMyCart(header, setLoading, dispatch)
    }, [])

    useEffect(() => {
        getProfile(dispatch, header, setLoading)
    }, [tokenLocal])

    // useEffect(() => {
    //     getMyCart(header, setLoading, setMyCart, dispatch)
    // }, [])

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const resProducts = await axios.get(
    //                 "https://petshop347.herokuapp.com/api/products"
    //             )
    //             setListProducts(resProducts.data)
    //             setLoading(false)
    //         } catch (err) {
    //             setLoading(false)
    //         }
    //     }
    //     fetchProducts()
    // }, [])

    useEffect(() => {
        filterProduct()
    }, [myCart])

    const filterProduct = () => {
        const test = []
        for (let i = 0; i < listProducts?.length; i++) {
            for (let j = 0; j < myCart?.length; j++) {
                if (listProducts[i]._id === myCart[j].idProduct) {
                    const obj = { ...listProducts[i], ...myCart[j] }
                    test.push(obj)
                }
            }
        }
        setFilterCart(test)
    }

    const handleShowCart = () => {
        setShowCart(!showCart)
    }

    const handleLogout = () => {
        try {
            dispatch(UserSlice.actions.logout(currentUser))
            localStorage.removeItem("accessToken")
            localStorage.removeItem("currentUser")
            setLoading(false);
            // <Navigate to="/" />
            navigate('/')
        } catch (err) {
            console.log(err);
        }
    }

    const handleGetSearchText = (e) => {
        setSearchText(e.target.value.trim())
    }

    const onSubmit = (e) => {
        e.preventDefault()
        navigate(`/store/${chuyenDoiURL(searchText)}`, {state: searchText})
        setSearchText('')
    }


    return (
        <>
            {loading && <Loading />}
            <div className="container-fluid" style={{ backgroundColor: '#1E1F29' }}>
                <div className="container">
                    <div className="row clearfix">
                        <div className="top__header">
                            <ul className="top__header-link">
                                <li><a href="#"><i className="fa fa-phone" /> 0365480118</a></li>
                                <li><a href="#"><i className="far fa-envelope" /> PetShop@email.com</a></li>
                                <li><a href="#"><i className="fa fa-map-marker" /> Cần Thơ</a></li>
                            </ul>
                            {
                                tokenLocal ?
                                    <ul className="top__header-link ">
                                        <li>
                                            <i className="far fa-user" />  <Link to="/my-account">{currentUser?.name}</Link>
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
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6">
                            <Link to="/">
                                <img src={logo} className="header__logo" alt="Logo Pet Shop" />
                            </Link>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 header__search">
                            <div className="header__search-group">
                                <form onSubmit={(e) => onSubmit(e)}>
                                    <input
                                        type="text"
                                        className="header__search-input"
                                        placeholder="Tìm kiếm..."
                                        // disabled
                                        value={searchText}
                                        onChange={ (e) => handleGetSearchText(e)}
                                    />
                                    <button type='submit' className="header__search-btn">
                                        <i className="far fa-search" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-6 col-6 header__cart order-right" >
                            <div className="cart">
                                <button className="cart__link" onClick={() => handleShowCart()}>
                                    <i className="fal fa-cart-plus" />  Giỏ hàng
                                    <div className="sqy">{myCart?.length || 0}</div>
                                </button>
                                {currentUser &&
                                    showCart &&
                                    <CartDropdown
                                        cart={filterCart}
                                        handleShowCart={handleShowCart}
                                    />
                                }
                            </div>
                            {

                                tokenLocal ?
                                    <button className="header__login" onClick={() => handleLogout()}>
                                        <i className="fas fa-sign-out"></i> Logout
                                    </button> :
                                    <Link to="/login" className="header__login">
                                        <i className="far fa-user" /> Đăng nhập
                                    </Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;