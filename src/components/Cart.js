import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeProductFromCart, getMyCart } from "../redux/callApi";
import Loading from "./UI/Loading";

const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [myCart, setMyCart] = useState()
    const [listProducts, setListProducts] = useState()
    const dispatch = useDispatch()
    const header = { x_authorization: localStorage.getItem("accessToken") }
    const [filterCart, setFilterCart] = useState()
    var stt = 0
    const totalPriceCart = filterCart?.reduce((x, y) => {
        const { cost, discount, quantityPurchased, ...rest } = y
        x += cost * quantityPurchased - discount
        return x
    }, 0)

    useEffect(() => {
        getMyCart(header, setLoading, setMyCart, dispatch)
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

    //get quantityPurchased Update
    const updateQuantityCart = (e, id) => {
        var config = {
            method: "put",
            url: `https://petshop347.herokuapp.com/api/carts/${id}`,
            headers: header,
            data:{
                quantityPurchased: e.target.value.trim()
            }
        }

        const resUpdate = async () => {
            try{
                setLoading(true)
                const res = await axios(config)
                window.location.href=""
                // setLoading(false)
            }catch(err){
                setLoading(false)
            }

        }

        resUpdate()
    }

    console.log(myCart);

    return loading ? <Loading /> : (
        <>
            <div className="cart-page">
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Giỏ hàng của bạn</h2>
                <div className="container" style={{ marginTop: '20px' }}>
                    <div className="row clearfix">
                        <table className="table table-bordered table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">#</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Mã sản phẩm</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Tên sản phẩm</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Ảnh sản phẩm</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '125px' }} scope="row">Đơn giá</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Số lượng</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '144px' }} scope="row">Thành tiền</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '70px' }} scope="row">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    // filterCart?.length > 0 ?
                                    filterCart && filterCart?.map((item, idx) => {
                                            stt++
                                            return (
                                                <tr key={idx} onChange={(e) => updateQuantityCart(e, item._id)}>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{stt}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.idProduct}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.productName}</td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <img width="50px" height="50px" src={item.images[0].url} alt={item.productName} />
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        {
                                                            item.cost?.toLocaleString(
                                                                "it-IT",
                                                                {
                                                                    style: "currency",
                                                                    currency: "VND"
                                                                }
                                                            )
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <input type="number" name="true" className="ip-quantily-cart" defaultValue={item.quantityPurchased} max={50} min={1} style={{ width: '80px' }} /><br />
                                                        {/* <span style="color:red;">Không đủ số lượng</span>
                          <input type="number" name="sl[<?=$row_giohang['idGioHang']?>]" value="<?=$SoLuong?>" max="50" min="1" style="width: 80px;"> */}
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        {
                                                            (item.cost * item.quantityPurchased).toLocaleString(
                                                                "it-IT",
                                                                {
                                                                    style: "currency",
                                                                    currency: "VND"
                                                                }
                                                            )
                                                        }
                                                    </td>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <button name="delete_giohang" value className="delete" onClick={() => removeProductFromCart(item._id, setLoading, header)}><i className="fas fa-times" style={{ fontSize: '1.5rem' }} /></button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        //  :
                                        // <tr>
                                        //     <td style={{ textAlign: 'center', verticalAlign: 'middle' }} colSpan={8}>Không có sản phẩm trong giỏ hàng</td>
                                        // </tr>
                                }

                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} />
                                    <td style={{ textAlign: 'left', verticalAlign: 'middle', fontWeight: 'bold' }} colSpan={5}>TỔNG TIỀN</td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'red' }}>
                                        {
                                            totalPriceCart?.toLocaleString(
                                                "it-IT",
                                                {
                                                    style: "currency",
                                                    currency: "VND"
                                                }
                                            )
                                        }
                                    </td>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} />
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div style={{ textAlign: 'right' }} className="container">
                <Link to="/checkout" className="btn btn-primary" style={{ marginRight: '5px' }}>Đặt hàng</Link>
                {/* <button name="dat_hang" class="btn btn-primary">Đặt hàng</button> */}
                {/* <button name="update_giohang" className="btn btn-info">Cập nhật</button> */}
            </div>
            <div style={{ textAlign: 'right' }} className="container">
                <span style={{ color: 'red', fontWeight: 'bold' }}>* Lưu ý các sản phẩm không đủ số lượng sẽ không được thêm vào đơn hàng</span>
            </div>
        </>
    )
}

export default Cart;