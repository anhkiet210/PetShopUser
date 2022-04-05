import React from "react";

const ProductDescription = (props) => {
    return (
        <>
            <div className="container">
                <div className="row">
                    {/* Product tab */}
                    <div className="col-md-12">
                        <div id="product-tab">
                            {/* product tab nav */}
                            <ul className="tab-nav">
                                <li className="tab-active"><a>Mô tả</a></li>
                            </ul>
                            {/* /product tab nav */}
                            {/* product tab content */}
                            <div className="tab-content">
                                {/* tab1  */}
                                <div className="row">
                                    <div className="col-md-12 motachitiet">
                                        {
                                            props.description && <div dangerouslySetInnerHTML={{__html: props.description}}></div>
                                        }
                                    </div>
                                </div>
                                {/* /tab1  */}
                            </div>
                            {/* /product tab content  */}
                        </div>
                    </div>
                    {/* /product tab */}
                </div>
            </div>

        </>
    )
}

export default ProductDescription;