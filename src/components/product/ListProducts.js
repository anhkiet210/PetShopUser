import React from "react";
import FakeProducts from "./fakeProducts";
import Product from "./Product";

const ListProduct = (props) => {

    return (
        <>
            <div className="section">
                <div className="container">
                    <div className="row">
                        {/* section title */}
                        <div className="section__title">
                            {props && props.title}
                        </div>
                    </div>
                    {/* section products */}
                    <div className="section__products">
                        {props.myCart && props.product && props.product.length > 0 && props.indexLast ?
                            props.product.slice(props.product.length - props.indexLast, props.product.length).map((item, index) => (
                                <Product
                                    key={index}
                                    id={item._id}
                                    productName={item.productName}
                                    cost={item.cost}
                                    img={item.images[0]}
                                    myCart={props.myCart}
                                />
                            )) :
                            <>
                                <FakeProducts />
                                <FakeProducts />
                                <FakeProducts />
                                <FakeProducts />
                            </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListProduct;
