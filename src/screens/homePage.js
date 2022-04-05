import React, { useEffect, useState } from 'react'
import SlideBanner from '../components/UI/SlideBanner';
import ListProduct from '../components/product/ListProducts';
import Banner from '../components/UI/Banner';
import { useSelector } from "react-redux"
import Loading from '../components/UI/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ProductSlice from '../redux/productSlice'
import { getAllProduct } from '../redux/callApi';

const Home = () => {
    const dispatch = useDispatch()
    const listProducts = useSelector(state => state.products.listProducts)
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         try {
    //             const resProducts = await axios.get(
    //                 "https://petshop347.herokuapp.com/api/products"
    //             )
    //             dispatch(ProductSlice.actions.getlistProducts(resProducts.data))
    //             setLoading(false)
    //         } catch (err) {
    //             setLoading(false)
    //         }
    //     }
    //     fetchProducts()
    // }, [])

    useEffect(() => getAllProduct(dispatch, setLoading), [])

    // console.log(listProducts);
    return loading ? <Loading /> :(
        <>
            <SlideBanner />
            {
                listProducts && 
                <ListProduct
                title="Sản phẩm mới"
                product={listProducts}
                indexLast={8}
            />
            }
            <Banner />
            {
                listProducts && 
                <ListProduct
                title="thức ăn cho mèo"
                product={listProducts}
                indexLast={4}
            />
            }
            {
                listProducts && 
                <ListProduct
                title="thức ăn cho chó"
                product={listProducts}
                indexLast={4}
            />
            }
        </>
    )
}

export default Home;