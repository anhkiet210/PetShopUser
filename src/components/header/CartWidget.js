import React from "react";

const CartWidget = () => {
    return (
        <>
            <div className="product-widget">
                <div className="product-img">
                    <img src="../img/1.png" alt="" />
                </div>
                <div className="product__body">
                    <h3 className="product__name"><a href="#">tên sản phẩm</a></h3>
                    <h4 className="product__price"><span className="qty">2 x </span>15.000đ</h4>
                    <h4 className="product__price"><span>Tổng: 15.000đ</span></h4>
                </div>
                <button name="delete_giohang" value className="delete"><i className="fas fa-times" /></button>
                <hr />
            </div>
        </>
    )
}

export default CartWidget