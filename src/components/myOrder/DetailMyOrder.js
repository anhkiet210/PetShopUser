import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import { getOrder } from "../../redux/callApi";
import axios from "axios";

const DetailMyOrder = () => {
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState()
    const [listProducts, setListProducts] = useState()
    const params = useParams()
    const [filterProductOrder, setFilterProductOrder] = useState()
    var stt = 0

    useEffect(() => {
        getOrder(params.id, setLoading, setOrder)
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
    }, [order])

    const filterProduct = () => {
        const test = []
        for (let i = 0; i < listProducts?.length; i++) {
            for (let j = 0; j < order?.productDetails.length; j++) {
                if (listProducts[i]._id === order?.productDetails[j].idProduct) {
                    const obj = { ...listProducts[i], ...order?.productDetails[j] }
                    test.push(obj)
                }
            }
        }
        setFilterProductOrder(test)
    }

    // console.log(filterProductOrder);
    // console.log(order.productDetails);

    return loading ? <Loading /> : (
        <div className="cart-page">
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Chi tiết đơn hàng số: {params.id}</h2>
            <div className="container" style={{ marginTop: '20px' }}>
                <div className="row clearfix">
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">#</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Mã sản phẩm</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Tên sản phẩm</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Giá sản phẩm</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Số lượng</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Giảm giá</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '125px' }} scope="row">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   filterProductOrder ?
                                filterProductOrder?.map((item, i) => {
                                    stt++
                                    return (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{stt}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.idProduct}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.productName}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {
                                                    item.cost.toLocaleString(
                                                        "it-IT",
                                                        {
                                                            style: "currency",
                                                            currency: "VND"
                                                        }
                                                    )
                                                }
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.quantityPurchased}</td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {
                                                    item.discount.toLocaleString(
                                                        "it-IT",
                                                        {
                                                            style: "currency",
                                                            currency: "VND"
                                                        }
                                                    )
                                                }
                                            </td>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                {
                                                    (item.cost * item.quantityPurchased - item.discount).toLocaleString(
                                                        "it-IT",
                                                        {
                                                            style: "currency",
                                                            currency: "VND"
                                                        }
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    )
                                }) :
                                <tr>
                                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }} colSpan={7}>Không có đơn hàng</td>
                                </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailMyOrder;