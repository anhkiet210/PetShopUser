import React from "react";

const ProductImg = (props) => {

    return (
        <>
            <div className="product__img">
                <div className="product__img-main">
                    <div id="img-main" className="carousel slide" data-ride="carousel" style={{ height: "100%" }}>
                        <div className="carousel-inner" role="listbox" style={{ height: "100%" }}>
                            <div className="carousel-item active" style={{ height: "100%" }}>
                                <img src={props.img[0].url} alt="" />
                            </div>
                            {
                                props.img &&
                                props.img.slice(1, props.img.length).map((item, idx) => (
                                    <div className="carousel-item" key={idx} style={{height: "100%"}}>
                                        <img src={item.url} alt="" />
                                    </div>
                                ))
                            }
                        </div>
                        <a className="carousel-control-prev" href="#img-main" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" ><i className="fas fa-chevron-left"></i></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#img-main" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true" ><i className="fas fa-chevron-right"></i></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProductImg;