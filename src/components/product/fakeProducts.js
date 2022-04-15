import React from "react";
import noImg from '../../image/no-image-800x600.png'
import { Link } from "react-router-dom";

const FakeProducts = () => {
    return (
        <div className="col-lg-3 col-md-4 col-sm-6 col-12">
            <div className="product">
                <div className="product__img">
                    <img src={noImg} alt="Không có sản phẩm để hiện thị" />
                </div>
                <div className="product__body">
                    <h3 className="product__name"><Link to="/">Không có sản phẩm để hiện thị</Link></h3>
                    <h4 className="product__price">000đ</h4>
                </div>
                {/* <div className="add-to-cart">
                    <button className="add-to-cart-btn">
                        <i className="fal fa-cart-plus" />
                        Thêm vào giỏ
                    </button>
                </div> */}
            </div>
        </div>
    )
}

export default FakeProducts;