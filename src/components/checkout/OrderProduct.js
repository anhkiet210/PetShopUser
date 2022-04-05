import React from "react";
import OrderItem from "./OrderItem";

const OrderProduct = () => {
    return (
        <>
            <div className="order-products">
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <OrderItem />
                <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                <div className="order-col">
                    <div><strong>TOTAL</strong></div>
                    <div><strong className="order-total">15.000đ</strong></div>
                </div>
            </div>
        </>
    )
}

export default OrderProduct;