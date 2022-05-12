import { useEffect } from 'react';
import './scrollToTop.css'

const ScrollToTop = (props) => {

    return(
        <button className="scroll-to-top" onClick={() => props?.scrollTop()}>
            <i className="fas fa-arrow-up"></i>
        </button>
    )
}

export default ScrollToTop;