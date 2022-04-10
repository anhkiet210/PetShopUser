import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BillingDetail from '../components/checkout/BillingDetail';
import OrderProduct from '../components/checkout/OrderProduct';
import Loading from '../components/UI/Loading';
import { getMyCart, getProfile, getAddress, addAddress } from '../redux/callApi';


const CheckoutPage = () => {
    const [loading, setLoading] = useState(true)
    const [currentUser, setCurrentUser] = useState()
    const tokenLocal = localStorage.getItem("accessToken")
    const [myCart, setMyCart] = useState([])
    const [listProducts, setListProducts] = useState()
    const dispatch = useDispatch()
    const header = { x_authorization: tokenLocal }
    const [filterCart, setFilterCart] = useState()
    const [address, setAddress] = useState()
    const [allAddress, setAllAddress] = useState([])
    const [show, setShow] = useState(false)
    const [agree, setAgree] = useState(false)
    const [addressOrder, setAddressOrder] = useState("Chọn địa chỉ")
    const orderDate = new Date().toLocaleDateString("es-ES")
    const totalPriceCart = filterCart?.reduce((x, y) => {
        const { cost, discount, quantityPurchased, ...rest } = y
        x += cost * quantityPurchased - discount
        return x
    }, 0)
    const shipCost = 30000

    const handleShowPopup = () => {
        setShow(!show)
    }


    useEffect(() => {
        getProfile(setCurrentUser, header, setLoading)
    }, [tokenLocal])

    useEffect(() => {
        getMyCart(header, setLoading, setMyCart, dispatch)
    }, [])

    useEffect(() => {
        getAddress(header, setLoading, setAllAddress)
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resProducts = await axios.get(
                    "https://petshop347.herokuapp.com/api/products"
                )
                setListProducts(resProducts.data)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

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

    //get new address
    const getNewAddress = (e) => {
        setAddress(e.target.value.trim())
    }

    //get address order
    const getAddressOrder = (e) => {
        setAddressOrder(e.target.value.trim())
    }

    //handle submit form add address
    const handleSubmit = (e) => {
        e.preventDefault()
        allAddress.map(item => {
            if(item.addressName === address)
            alert("Địa chỉ đã tồn tại")
            return
        })
        addAddress(header, address, setLoading)
        // console.log(address);
    }

    //change state agree
    const handleAgree = (e) => {
        setAgree(e.target.checked)
    }

    //handle delete  cart
    const handleDeleteCart = async () => {
        for (let i = 0; i < myCart?.length; i++) {
            const element = myCart[i];
            console.log(element);
            await axios.delete(`https://petshop347.herokuapp.com/api/carts/${element._id}`, {
                headers: header
            })
        }
    }

    //handle order
    const handleOrder = async () => {
        if(myCart.length === 0){
            alert("Bạn không có sản phẩm nào cần thanh toán!")
            return
        }
        if(agree === false){
            alert("Bạn chưa đồng ý với điều khoản của chúng tôi!")
            return
        }
        if(addressOrder === "Chọn địa chỉ"){
            alert("Bạn chưa chọn địa chỉ giao hàng!")
            return
        }
        var config ={
            method: "post",
            url: "https://petshop347.herokuapp.com/api/orders",
            headers: header,
            data: {
                idCustomer: currentUser?._id,
                address: addressOrder,
                payments: "Thanh toán khi nhận hàng",
                totalCost: totalPriceCart + shipCost,
                shipCost: shipCost,
                orderDate: orderDate,
                productDetails: myCart
            }

        }
        
        try{
            setLoading(true)
            await axios(config)
            handleDeleteCart()
            alert("Chúc mừng quý khách đã đặt hàng thành công! \nBạn có thể theo dõi đơn hàng của mình trong mục \"Theo dõi đơn hàng\". \n Cảm ơn bạn đã đồng hành cùng PetShop!");
            window.location.href="/my-order"
            setLoading(false)
        }catch(err){
            setLoading(false)
        }

    }

    // console.log(myCart);

    return loading ? <Loading /> :(
        <>
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-7">
                            {/* Billing Details */}
                            {currentUser &&
                                <BillingDetail
                                    handle={handleShowPopup}
                                    infoUser={currentUser}
                                    address={allAddress}
                                    getAddressOrder={getAddressOrder}
                                />
                            }
                            {/* /Billing Details */}
                        </div>
                        {/* Order Details */}
                        <div className="col-md-5 order-details">
                            <div className="section-title text-center">
                                <h3 className="title">ĐƠN HÀNG CỦA BẠN</h3>
                            </div>
                            <div className="order-summary">
                                <div className="order-col">
                                    <div><strong>SẢN PHẨM</strong></div>
                                    <div><strong>TỔNG</strong></div>
                                </div>
                                {
                                    filterCart &&
                                    <OrderProduct
                                        myCart={filterCart}
                                        totalPriceCart={totalPriceCart}
                                        shipCost={shipCost}
                                    />
                                }
                            </div>
                            <div className="payment-method">
                                <div className="input-radio">
                                    <input type="radio" name="payment" id="payment-2" defaultValue="tienmat" defaultChecked />
                                    <label htmlFor="payment-2">
                                        <span />
                                        Thanh toán khi nhận hàng
                                    </label>
                                    <div className="caption">
                                        <p>Thanh toán tiền mặt trực tiếp cho nhân viên giao hàng khi đơn hàng được giao tới.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="input-checkbox">
                                <input 
                                required 
                                type="checkbox" 
                                id="terms" 
                                name="checkdongy" 
                                onChange={(e) => handleAgree(e)}
                                />
                                <label htmlFor="terms">
                                    <span />
                                    Tôi đã đọc và chấp nhận các điều khoản &amp; điều kiện
                                </label>
                            </div>
                            <button 
                            name="btndathang"
                            className="primary-btn order-submit"
                            onClick={() => handleOrder()}
                            >ĐẶT HÀNG</button>
                        </div>
                        {/* /Order Details */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
                {
                    show &&
                    <div className="popup-add-address">
                        <button className="btn-close" title="Close" onClick={() => handleShowPopup()}>x</button>
                        <form autoComplete='off' onSubmit={(e) => handleSubmit(e)}>
                            <input
                                type="text"
                                className="input input-add-address"
                                placeholder="Nhập địa chỉ..."
                                name="add-address-input"
                                required
                                onChange={(e) => getNewAddress(e)}
                            />
                            <input
                                type="submit"
                                name="add-address"
                                value="Thêm"
                                className="btn btn-outline-info"
                                style={{ marginTop: '30px', marginLeft: '180px' }}
                            />
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default CheckoutPage;