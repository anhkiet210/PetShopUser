import './thanksPage.css'
import  { Link } from 'react-router-dom'

const ThanksPage = () => {
    return(
        <div className="container">
            <div className="row clearfix">
                <div className="thanks">
                    <p>Chúc mừng quý khách đã đặt hàng thành công!</p>
                    <p>Bạn có thể theo dõi đơn hàng của mình trong mục <Link to="/my-order" className='follow-order'>Theo dõi đơn hàng</Link></p>
                    <p>Cảm ơn bạn đã đồng hành cùng PetShop!</p>
                    <Link to="/" className='continue'>Tiếp tục mua sắm</Link>
                </div>
            </div>
        </div>
    )
}

export default ThanksPage;