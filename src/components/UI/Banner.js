import React from "react";
import banner from "../../image/banner/7.jpg";

const Banner = () => {
    return (
        <>
            {/* banner */}
            <div className="container">
                <div className="row">
                    <div className="banner">
                        <a href="#" className="banner__link" target="_self">
                            <div className="banner__img">
                                <img src={banner} alt="" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner;