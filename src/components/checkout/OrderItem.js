import React from "react";

const OrderItem = () => {
    return (
        <>
            <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
            <div className="order-col" >
                <div style={{ marginRight: '20px !important' }}>sản phảm 1</div>
                <div style={{ textAlign: 'right', marginLeft: '30px' }}>
                    <p>1 x 12.000đ</p>
                    <p style={{ fontWeight: 'bold' }}>12.000đ</p>
                </div>
            </div>
        </>
    )
}

export default OrderItem;