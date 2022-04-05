import React from "react";
import { Link } from "react-router-dom";

const Product = (props) => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="product">
                <div className="product__img">
                    <img src={props && props.img.url} alt={props.productName} />
                </div>
                <div className="product__body">
                    <h3 className="product__name"><Link to={`/product/${props.id}`}>{props.productName}</Link></h3>
                    <h4 className="product__price">
                        {props.cost.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND"
                        })}
                    </h4>
                </div>
                <div className="add-to-cart">
                    <button className="add-to-cart-btn">
                        <i className="fal fa-cart-plus" />
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Product;