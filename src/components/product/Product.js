import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { chuyenDoiURL } from "../../redux/changeText";
import { addToCart } from "../../redux/callApi";
import Loading from '../UI/Loading'

const Product = (props) => {
    const [loading, setLoading] = useState(false)
    const header = { x_authorization: localStorage.getItem("accessToken") }
   
    console.log(props.myCart)
    return loading ? <Loading /> : (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="product">
                <div className="product__img">
                    <img src={props && props.img.url} alt={props.productName} />
                </div>
                <div className="product__body">
                    <h3 className="product__name"><Link to={`/product/${chuyenDoiURL(props.productName)}.${props.id}.html`}>{props.productName}</Link></h3>
                    <h4 className="product__price">
                        {props.cost.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND"
                        })}
                    </h4>
                </div>
                <div className="add-to-cart">
                    <button className="add-to-cart-btn" onClick={ () => addToCart(props.id, header, setLoading, props.myCart) }>
                        <i className="fal fa-cart-plus" />
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product;