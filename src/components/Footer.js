import React from "react";

const Footer = () => {
    return (
        <>
            {/* footer */}
            <footer id="footer">
                <div className="footer">
                    <div className="footer__heading">
                        <div className="social facebook"><i className="fab fa-facebook-f" /></div>
                        <div className="social youtube"><i className="fab fa-youtube" /></div>
                        <div className="social instagram"><i className="fab fa-instagram" /></div>
                    </div>
                    <div className="footer__body">
                        <div className="contact">
                            <div className="title">Liên hệ</div>
                            <div className="text">
                                <i className="fas fa-home" /> Địa chỉ: Xuân Khánh, Ninh Kiều, Cần Thơ
                            </div>
                            <div className="text">
                                <i className="fa fa-phone" /> 123456789
                            </div>
                            <div className="text">
                                <i className="far fa-envelope" /> PetShop@email.com
                            </div>
                        </div>
                        <div className="about-us">
                            <div className="title">About us</div>
                            <div className="text">
                                Hãy đến với chúng tôi để trãi nghiệm sự chăm sóc tốt nhất.
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom">Copyright © made in 2022 | This website is made with by <a href="#"> Phan Anh Kiệt</a> | <a href="#">Trần Toàn Phát</a> | <a href="#">Dương Lê Minh Hậu</a></div>
                </div>
            </footer>
        </>
    )
}

export default Footer;