import React from "react";

const OrderItem = (props) => {
    return (
        <>
            <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
            <div className="order-col" >
                <div style={{ marginRight: '20px !important' }}>{props.productName}</div>
                <div style={{ textAlign: 'right', marginLeft: '30px' }}>
                    <p>{props.quantityPurchased} x {
                        props.cost.toLocaleString(
                            "it-IT",
                            {
                                style: "currency",
                                currency: "VND"
                            }

                        )
                    }</p>
                    <p style={{ fontWeight: 'bold' }}>
                        {
                            (props.quantityPurchased * props.cost).toLocaleString("it-IT",
                            {
                                style: "currency",
                                currency: "VND"
                            })
                        }
                    </p>
                </div>
            </div>
        </>
    )
}

export default OrderItem;