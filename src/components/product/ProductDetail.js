import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../../redux/callApi";
import { useSnackbar } from "notistack";
import Loading from "../UI/Loading";

const ProductDetail = (props) => {

    const cart = useSelector(state => state.cart.cartItem)
    const [loading, setLoading] = useState(false)
    const header = {x_authorization: localStorage.getItem("accessToken")}
    const { enqueueSnackbar } = useSnackbar()

    
    return loading ? <Loading /> : (
        <>
            <div className="product__detail">
                <div className="product__detail-name">{props.productName}</div>
                <div className="product__detail-price">
                    <span className="curent-price">
                        {props.cost.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                    {/* <span className="old-price">Giá cũ</span> */}
                </div>
                <hr />
                <div className="group-action">
                    {/* <div className="quantily">
                        Số lượng
                        <div className="quantily__action">
                            <span className="add-down action" onClick={ () => handleDecrease()} ><i className="fal fa-minus" /></span>
                            <input type="number"  min={1} value={quantity} className="ip-quantily" readOnly/>
                            <span className="add-up action" onClick={ () => handleIncrease()}><i className="fal fa-plus" /></span>
                        </div>
                    </div> */}
                    {/* <div className="add-to-cart" style={{ opacity: 1, transform: 'translateY(0)' }}> */}
                        <button className="add-to-cart-btn" onClick={() => addToCart(props?.idProduct, header, setLoading, cart, enqueueSnackbar)}>
                            <i className="fal fa-cart-plus" />
                            Thêm vào giỏ
                        </button>
                    {/* </div> */}
                </div>
                <hr />
                <ul className="product-links">
                    <li>Share:</li>
                    <li><a href="http://facebook.com/hi.iam.dazai" target={"_blank"}><i className="fab fa-facebook-f" /></a></li>
                    <li><a href="#"><i className="fab fa-twitter" /></a></li>
                    <li><a href="#"><i className="fab fa-google-plus" /></a></li>
                    <li><a href="#"><i className="far fa-envelope" /></a></li>
                </ul>
                <hr />
                <span>Số lượng còn lại: {props.qty}</span>
            </div>
        </>
    )
}

export default ProductDetail;