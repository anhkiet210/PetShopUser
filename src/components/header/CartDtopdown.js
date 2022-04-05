import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const CartDropdown = (props) => {
    return (
        <>
            <div className="cart__dropdown">
                <div className="cart-list">
                   <CartWidget />
                   <CartWidget />
                   <CartWidget />
                </div>
                <div className="cart-summary">
                    <small>3 sản phẩm</small>
                    <h5>TỔNG: 15.000đ</h5>
                </div>
                <div className="cart-btns">
                    <Link to="/cart">View Cart</Link>
                    <Link to="/checkout">Checkout  <i className="fa fa-arrow-circle-right" /></Link>
                </div>
            </div>
        </>
    )
}

export default CartDropdown;