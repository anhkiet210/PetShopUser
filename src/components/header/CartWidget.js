import React, { useState } from "react";
import { Link } from "react-router-dom";
import { removeProductFromCart } from "../../redux/callApi";
import Loading from "../UI/Loading";
import { chuyenDoiURL } from "../../redux/changeText";

const CartWidget = (props) => {
    // console.log(props.idProduct);
    const header = {x_authorization: localStorage.getItem("accessToken")}
    const [loading, setLoading] = useState(false)
    return loading ? <Loading /> : (
        <div className="product-widget">
            <div className="product-img">
                <img src={props.img} alt="" />
            </div>
            <div className="product__body">
                <h3 className="product__name"><Link to={`/product/${chuyenDoiURL(props.productName)}.${props.idProduct}.html`}>{props.productName}</Link></h3>
                <h4 className="product__price"><span className="qty">{props.quantityPurchased} x </span>{props.cost.toLocaleString("it-IT", {style: "currency", currency: "VND"})}</h4>
                <h4 className="product__price"><span>Tổng: 15.000đ</span></h4>
            </div>
            <button name="delete_giohang" value className="delete" onClick={() => removeProductFromCart(props.id, setLoading, header)}><i className="fas fa-times" /></button>
            <hr />
        </div>
    )
}

export default CartWidget