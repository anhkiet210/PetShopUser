import React from "react";
import banner1 from "../../image/banner/1.webp"
import banner2 from "../../image/banner/2.webp"
import banner3 from "../../image/banner/3.webp"
import banner4 from "../../image/banner/4.webp"
import banner5 from "../../image/banner/5.webp"
import banner6 from "../../image/banner/6.webp"

const SlideBanner = () => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div id="main-slide" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                            <li data-target="#main-slide" data-slide-to={0} className="active" />
                            <li data-target="#main-slide" data-slide-to={1} />
                            <li data-target="#main-slide" data-slide-to={2} />
                            <li data-target="#main-slide" data-slide-to={3} />
                            <li data-target="#main-slide" data-slide-to={4} />
                            <li data-target="#main-slide" data-slide-to={5} />
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item active">
                                <img className="img-item" src={banner1} alt="First slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="img-item" src={banner2} alt="Second slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="img-item" src={banner3} alt="Third slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="img-item" src={banner4} alt="Four slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="img-item" src={banner5} alt="Fifth slide" />
                            </div>
                            <div className="carousel-item">
                                <img className="img-item" src={banner6} alt="Six slide" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#main-slide" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true" ><i className="fas fa-chevron-left"></i></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#main-slide" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"><i className="fas fa-chevron-right"></i></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SlideBanner;