import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../UI/Loading";
import { getAllProduct, getOrder } from "../../redux/callApi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const DetailMyOrder = () => {
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState()
    // const [listProducts, setListProducts] = useState()
    const [filterProductOrder, setFilterProductOrder] = useState([])

    const params = useParams()
    const dispatch = useDispatch()
    const listProducts = useSelector(state => state.products.listProducts)
    const productsDetail = order?.productDetails
    console.log(listProducts);
    console.log(filterProductOrder);
    console.log(productsDetail);
    console.log(order);

    useEffect( () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        })
    }, [])

    useEffect(() => {
        getOrder(params.id, setLoading, setOrder)
    }, [params.id])

    useEffect(() => { getAllProduct(dispatch, setLoading) }, [])


    useEffect(() => {
        filterProduct()
    }, [order, listProducts])

    const filterProduct = () => {
        const test = []
        for (let i = 0; i < listProducts?.length; i++) {
            for (let j = 0; j < productsDetail?.length; j++) {
                if (listProducts[i]?._id === productsDetail[j]?.idProduct) {
                    const obj = { ...listProducts[i], ...productsDetail[j] }
                    test.push(obj)
                }
            }
        }

        setFilterProductOrder(test)
    }

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
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '100px' }} scope="row">Giá sản phẩm</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '100px' }} scope="row">Số lượng</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '100px' }} scope="row">Giảm giá</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', maxWidth: '100px' }} scope="row">Tổng tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterProductOrder &&
                                filterProductOrder?.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{i + 1}</td>
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
                                })
                                // :
                                // <tr>
                                //     <td style={{ textAlign: 'center', verticalAlign: 'middle' }} colSpan={7}>Không có đơn hàng</td>
                                // </tr>
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DetailMyOrder;