import React, { useRef } from "react";

const ProductImg = (props) => {
    const refImgBig = useRef()

    //handel change imgage
    const handleChangeImg = (e) => {
        refImgBig.current.src = e.target.src
        console.log(document.querySelector('img-active'));
        e.target.classList.add('img-active')
    }


    return (
        <>
            <div className="product__img">
                <div className="product__img-main">
                    {
                        props.img && 
                        <img src={props.img[0].url} alt={props.productName} ref={refImgBig} />
                    }
                    {/* <img src={props.img[0].url} alt={props.productName} /> */}
                </div>
                <div className="product__img-list">
                    {
                        props.img && 
                        props.img.slice(1, props.img.length).map((item, index) => (
                            <div className="img-item " key={index}  >
                                <img src={item.url} alt={item.productName}  onClick={(e) => handleChangeImg(e)} />
                            </div>
                        ))
                    }
                </div>
                <div className="pre-slide arrow"><i className="fas fa-angle-left" /></div>
                <div className="next-slide arrow"><i className="fas fa-angle-right" /></div>
            </div>
        </>
    )
}

export default ProductImg;