import React, { useEffect, useState } from 'react'
import SlideBanner from '../components/UI/SlideBanner';
import ListProduct from '../components/product/ListProducts';
import Banner from '../components/UI/Banner';
import { useSelector } from "react-redux"
import Loading from '../components/UI/Loading';
import { useDispatch } from 'react-redux';
import { getAllProduct, getMyCart } from '../redux/callApi';

const Home = () => {
    const dispatch = useDispatch()
    const listProducts = useSelector(state => state.products.listProducts)
    const [loading, setLoading] = useState(true)
    const header = { x_authorization: localStorage.getItem("accessToken") }
    const [cart, setCart] = useState([])

    useEffect(() => {
        getMyCart(header, setLoading, setCart, dispatch)
    }, [])
    useEffect(() => getAllProduct(dispatch, setLoading), [])

    // console.log(listProducts);
    return loading ? <Loading /> : (
        <>
            <SlideBanner />
            {
                listProducts &&
                <ListProduct
                    myCart={cart}
                    title="Sản phẩm mới"
                    product={listProducts}
                    indexLast={8}
                />
            }
            <Banner />
            {
                listProducts &&
                <ListProduct
                    myCart={cart}
                    title="thức ăn cho mèo"
                    product={listProducts}
                    indexLast={4}
                />
            }
            {
                listProducts &&
                <ListProduct
                    myCart={cart}
                    title="thức ăn cho chó"
                    product={listProducts}
                    indexLast={4}
                />
            }
        </>
    )
}

export default Home;