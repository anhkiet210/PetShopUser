import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeProductFromCart, getMyCart } from "../redux/callApi";
import { useSnackbar } from "notistack"
import Loading from "./UI/Loading";

const Cart = () => {
    const [loading, setLoading] = useState(false)
    // const [myCart, setMyCart] = useState()
    const [listProducts, setListProducts] = useState()
    const [filterCart, setFilterCart] = useState()

    const dispatch = useDispatch()
    const header = { x_authorization: localStorage.getItem("accessToken") }
    const myCart = useSelector(state => state.cart.cartItem)
    const { enqueueSnackbar } = useSnackbar()

    const totalPriceCart = filterCart?.reduce((x, y) => {
        const { cost, discount, quantityPurchased } = y
        x += cost * quantityPurchased - discount
        return x
    }, 0)

    useEffect( () => {
        window.screenTop = 0

    }, [])

    useEffect(() => {
        getMyCart(header, setLoading, dispatch)
    }, [])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const resProducts = await axios.get(
                    "https://petshop347.herokuapp.com/api/products"
                )
                const list = await resProducts.data
                setListProducts(list)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        fetchProducts()
    }, [])

    useEffect(() => {
        filterProduct()
    }, [listProducts, myCart])

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

    // Update quantityPurchased 
    const updateQuantityCart = (e, item) => {
        // console.log(typeof(e.target.value));
        if (item.quantityPurchased > item.quantity || parseInt(e.target.value) > item.quantity) {
            enqueueSnackbar("Kh??ng ????? s??? l?????ng", {
                variant: "warning",
                autoHideDuration: 2000,
            })
            return
        }
        var config = {
            method: "put",
            url: `https://petshop347.herokuapp.com/api/carts/${item._id}`,
            headers: header,
            data: {
                quantityPurchased: e.target.value.trim()
            }
        }

        const resUpdate = async () => {
            try {
                setLoading(true)
                const res = await axios(config)
                window.location.reload()
                setLoading(false)
            } catch (err) {
                setLoading(false)
                alert("L???i c???p nh???t s??? l?????ng s???n ph???m")
                console.log(err);
            }

        }

        resUpdate()
    }


    return loading ? <Loading /> : (
        <>
            <div className="cart-page">
                <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Gio?? ha??ng cu??a ba??n</h2>
                <div className="container" style={{ marginTop: '20px' }}>
                    <div className="row clearfix">
                        <table className="table table-bordered table-hover table-responsive">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">#</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Ma?? s???n ph???m</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">T??n sa??n ph????m</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">A??nh sa??n ph????m</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '125px' }} scope="row">????n gi??</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">S???? l??????ng</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '144px' }} scope="row">Th??nh ti????n</th>
                                    <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '70px' }} scope="row">Thao ta??c</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterCart?.length > 0 ?
                                        filterCart && filterCart?.map((item, idx) => {
                                            return (
                                                <tr key={idx} onChange={(e) => updateQuantityCart(e, item)}>
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{idx + 1}</td>
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
                                                        <input type="number" name="true" className="ip-quantily-cart" defaultValue={item.quantityPurchased} max={item.quantity} min={1} style={{ width: '80px' }} /><br />
                                                        {
                                                            item.quantityPurchased > item.quantity ?
                                                                <span style={{ color: "red" }}>Kh??ng ??u?? s???? l??????ng</span> : ""
                                                        }
                                                        {/* <input type="number" name="sl[<?=$row_giohang['idGioHang']?>]" value="<?=$SoLuong?>" max="50" min="1" style="width: 80px;"> */}
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
                                                    {/* <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <button
                                                            className="btn btn-info"
                                                            onClick={() => removeProductFromCart(item._id, setLoading, header)}
                                                        >
                                                            C???p nh???t
                                                        </button>
                                                    </td> */}
                                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                        <button
                                                            className="delete"
                                                            onClick={() => removeProductFromCart(item._id, setLoading, header)}
                                                        >
                                                            <i className="fas fa-times" style={{ fontSize: '1.5rem' }} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                        :
                                        <tr>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }} colSpan={8}>Kh??ng c?? s???n ph???m trong gi??? h??ng</td>
                                        </tr>
                                }

                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} />
                                    <td style={{ textAlign: 'left', verticalAlign: 'middle', fontWeight: 'bold' }} colSpan={5}>T????NG TI????N</td>
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
                <Link to="/checkout" className="btn btn-primary" style={{ marginRight: '5px' }}>?????t h??ng</Link>
                {/* <button name="dat_hang" class="btn btn-primary">??????t ha??ng</button> */}
                {/* <button name="update_giohang" className="btn btn-info">C????p nh????t</button> */}
            </div>
            <div style={{ textAlign: 'right' }} className="container">
                <span style={{ color: 'red', fontWeight: 'bold' }}>* L??u y?? ca??c sa??n ph????m kh??ng ??u?? s???? l??????ng se?? kh??ng ????????c th??m va??o ????n ha??ng</span>
            </div>
        </>
    )
}

export default Cart;