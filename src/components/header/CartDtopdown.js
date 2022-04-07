import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const CartDropdown = (props) => {
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
                    <small> sản phẩm</small>
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