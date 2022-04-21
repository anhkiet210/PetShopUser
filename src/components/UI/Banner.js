import React from "react";

const Banner = (props) => {
    return (
        <>
            {/* banner */}
            <div className="container">
                <div className="row">
                    <div className="banner">
                        <a href="#" className="banner__link" target="_self">
                            <div className="banner__img">
                                <img src={props?.banner} alt="" />
                            </div>
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Banner;