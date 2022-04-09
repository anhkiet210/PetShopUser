import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const CartDropdown = (props) => {
    const totalPriceCart = props?.cart.reduce((x, y) => {
        const { cost, discount, quantityPurchased, ...rest } = y
        x += cost * quantityPurchased - discount
        return x
    }, 0)
    return (
        <>
            <div className="cart__dropdown">
                <div className="cart-list">
                    {
                        props.cart &&
                        props.cart.map((item, idx) => (
                            <CartWidget
                                key={idx}
                                id={item._id}
                                idProduct={item.idProduct}
                                productName={item.productName}
                                img={item.images[0].url}
                                cost={item.cost}
                                quantityPurchased={item.quantityPurchased}
                            />
                        ))
                    }
                </div>
                <div className="cart-summary">
                    <small>{props?.cart.length} sản phẩm</small>
                    <h5>TỔNG: {totalPriceCart.toLocaleString("it-IT",
                        {
                            style: "currency",
                            currency: "VND"
                        }
                    )}</h5>
                </div>
                <div className="cart-btns">
                    <Link to="/cart" onClick={() => props?.handleShowCart()}>View Cart</Link>
                    <Link to="/checkout" onClick={() => props?.handleShowCart()}>Checkout  <i className="fa fa-arrow-circle-right" /></Link>
                </div>
            </div>
        </>
    )
}

export default CartDropdown;