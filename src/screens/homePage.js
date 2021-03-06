import banner from '../image/banner/7.jpg'
import React, { useEffect, useState } from 'react'
import SlideBanner from '../components/UI/SlideBanner';
import ListProduct from '../components/product/ListProducts';
import Banner from '../components/UI/Banner';
import { useSelector } from "react-redux"
import Loading from '../components/UI/Loading';
import { useDispatch } from 'react-redux';
import { getAllProduct, getMyCart, getProductByCategory } from '../redux/callApi';

const Home = () => {
    const dispatch = useDispatch()
    const listProducts = useSelector(state => state.products.listProducts)
    const cart = useSelector(state => state.cart.cartItem)
    const [loading, setLoading] = useState(false)
    const header = { x_authorization: localStorage.getItem("accessToken") }
    // const [cart, setCart] = useState([])
    // const [productDog, setProductDog] = useState([])
    // const [productCat, setProductCat] = useState([])

    const productDog = listProducts.filter( (item) => item.idCategory === "624702df787498345e8966bd")
    const productCat = listProducts.filter( (item) => item.idCategory === "6247039d787498345e8966be")

    // useEffect(() => {
    //     getMyCart(header, setLoading, setCart, dispatch)
    // }, [])

    useEffect(() => getAllProduct(dispatch, setLoading), [])
    // useEffect( () => getProductByCategory("624702df787498345e8966bd", setLoading, setProductDog), [])
    // useEffect( () => getProductByCategory("6247039d787498345e8966be", setLoading, setProductCat), [])

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
            <Banner 
                banner={banner}
            />
            {
                listProducts &&
                <ListProduct
                    myCart={cart}
                    title="thức ăn cho mèo"
                    product={productCat}
                    indexLast={4}
                />
            }
            {
                listProducts &&
                <ListProduct
                    myCart={cart}
                    title="thức ăn cho chó"
                    product={productDog}
                    indexLast={4}
                />
            }
        </>
    )
}

export default Home;