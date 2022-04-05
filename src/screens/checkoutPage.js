import React from 'react'
import BillingDetail from '../components/checkout/BillingDetail';
import OrderProduct from '../components/checkout/OrderProduct';


const CheckoutPage = () => {
    return (
        <>
            <div className="section">
                {/* container */}
                <div className="container">
                    {/* row */}
                    <div className="row">
                        <div className="col-md-7">
                            {/* Billing Details */}
                            <BillingDetail />
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
                                <OrderProduct />
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
                                <input required type="checkbox" id="terms" name="checkdongy" />
                                <label htmlFor="terms">
                                    <span />
                                    Tôi đã đọc và chấp nhận các điều khoản &amp; điều kiện
                                </label>
                            </div>
                            <button name="btndathang" style={{ width: '100%' }} className="primary-btn order-submit">ĐẶT HÀNG</button>
                        </div>
                        {/* /Order Details */}
                    </div>
                    {/* /row */}
                </div>
                {/* /container */}
                <div className="popup-add-address">
                    <button className="btn-close" title="Close">x</button>
                    <form action method="post">
                        <input type="text" className="input input-add-address" placeholder="Nhập địa chỉ..." name="add-address-input" required />
                        <input type="submit" name="add-address" defaultValue="Thêm" className="btn btn-outline-info" style={{ marginTop: '30px', marginLeft: '180px' }} />
                    </form>
                </div>
            </div>
        </>
    )
}

export default CheckoutPage;