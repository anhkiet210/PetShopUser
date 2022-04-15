import React from "react";
import OrderItem from "./OrderItem";

const OrderProduct = (props) => {
    return (
        <>
            <div className="order-products">
                {
                    props?.myCart.map((item, i) => (
                        <OrderItem
                            key={i}
                            productName={item.productName}
                            cost={item.cost}
                            quantityPurchased={item.quantityPurchased}
                        />
                    ))
                }
                <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                <div className="order-col">
                    <div><strong>Tiền ship: </strong></div>
                    <div><strong className="order-total">
                        {
                            props.myCart.length > 0 ?
                                props?.shipCost.toLocaleString(
                                    "it-IT",
                                    {
                                        style: "currency",
                                        currency: "VND"
                                    }
                                ) : 0
                        }
                    </strong></div>
                </div>
                <div className="order-col">
                    <div><strong>TỔNG TIỀN: </strong></div>
                    <div><strong className="order-total">
                        {
                            props.totalPriceCart &&
                            (props?.totalPriceCart + props?.shipCost).toLocaleString(
                                "it-IT",
                                {
                                    style: "currency",
                                    currency: "VND"
                                }
                            )
                        }
                    </strong></div>
                </div>
            </div>
        </>
    )
}

export default OrderProduct;