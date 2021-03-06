import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrder, DeleteOrder } from "../../redux/callApi";
import Loading from "../UI/Loading";

const MyOrder = () => {
    const [myOrder, setMyOrder] = useState([])
    const header = { x_authorization: localStorage.getItem("accessToken") }
    const [loading, setLoading] = useState(false)
    var stt = 0

    useEffect( () => {
        window.scrollTo({
            top: 0, 
            behavior: "smooth"
        })
    }, [])

    useEffect(() => {
        getMyOrder(header, setLoading, setMyOrder)
    }, [])

    // console.log(myOrder);

    return loading ? <Loading /> : (
        <div className="cart-page">
            <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Đơn hàng của bạn</h2>
            <div className="container" style={{ marginTop: '20px' }}>
                <div className="row clearfix">
                    <table className="table table-bordered table-hover table-responsive">
                        <thead>
                            <tr>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">#</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Mã hóa đơn</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', minWidth: '200px' }} scope="row">Địa chỉ giao hàng</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Phương thức thanh toán</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Tiền ship</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Tổng tiền</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '125px' }} scope="row">Trạng thái</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Ngày đặt	</th>
                                <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '70px' }} scope="row" colSpan={2}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myOrder && myOrder.length > 0 ?
                                    myOrder.map((item, i) => {
                                        stt++
                                        return (
                                            <tr key={i}>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{stt}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item._id}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle', minWidth: '200px' }}>{item.address}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.payments}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    {
                                                        item.shipCost.toLocaleString("it-IT",
                                                            {
                                                                style: "currency",
                                                                currency: "VND"
                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    {
                                                        item.totalCost.toLocaleString("it-IT",
                                                            {
                                                                style: "currency",
                                                                currency: "VND"
                                                            }
                                                        )
                                                    }
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.status}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.orderDate.slice(0, 10)}</td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <Link to={`/detail-my-order/${item._id}`}>Xem chi tiết</Link>
                                                </td>
                                                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                                    <button
                                                        className="delete"
                                                        onClick={() => DeleteOrder(item._id, setLoading)}
                                                        title="Hủy đơn hàng"
                                                    >
                                                        <i className="fas fa-times" style={{ fontSize: '1.5rem' }} />
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', fontSize: '2rem', fontWeight: '700' }} colSpan={9}> Bạn chưa có đơn hàng nào</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default MyOrder;