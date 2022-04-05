import React, { useState } from "react";

const ProductDetail = (props) => {
    const [quantity, setQuantity] = useState(1)

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleDecrease = () => {
        quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1)
    }
    
    return (
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
                    <div className="quantily">
                        Số lượng
                        <div className="quantily__action">
                            <span className="add-down action" onClick={ () => handleDecrease()} ><i className="fal fa-minus" /></span>
                            <input type="number"  min={1} value={quantity} className="ip-quantily" readOnly/>
                            <span className="add-up action" onClick={ () => handleIncrease()}><i className="fal fa-plus" /></span>
                        </div>
                    </div>
                    {/* <div className="add-to-cart" style={{ opacity: 1, transform: 'translateY(0)' }}> */}
                        <button className="add-to-cart-btn">
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
            </div>
        </>
    )
}

export default ProductDetail;