import React from "react";

const FeatureBox = () => {
    return (
        <>
            {/* feature box */}
            <div className="container">
                <div className="inner">
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="feature__box">
                                <div className="feature__box-icon"><i className="fas fa-paper-plane" /></div>
                                <div className="feature__box-body">
                                    <h5 className="heading">Mail</h5>
                                    <div className="content">PetShop@gmail.com</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="feature__box">
                                <div className="feature__box-icon"><i className="fas fa-phone" /></div>
                                <div className="feature__box-body">
                                    <h5 className="heading">Call</h5>
                                    <div className="content">123456789</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-12">
                            <div className="feature__box">
                                <div className="feature__box-icon"><i className="fas fa-map-marker-alt" /></div>
                                <div className="feature__box-body">
                                    <h5 className="heading">Find us</h5>
                                    <div className="content">Xuân Khánh, Ninh Kiều, Cần Thơ</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FeatureBox;