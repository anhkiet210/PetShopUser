import banner from '../image/banner/9.jpg'
import React, { useEffect, useRef, useState } from "react";
import Banner from "../components/UI/Banner";
import Product from "../components/product/Product";
import { useParams, useLocation } from "react-router-dom";
import { getAllProduct, getProductByCategory } from '../redux/callApi'
import Loading from '../components/UI/Loading'
import FakeProducts from '../components/product/fakeProducts'
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../components/UI/pagination/Pagination";

const StorePage = () => {
    const params = useParams()
    const [loading, setLoading] = useState(false)
    const [productByCategory, setProductByCategory] = useState([])


    const dispatch = useDispatch()
    const { state } = useLocation()
    const listItemRef = useRef()
    const listProducts = useSelector(state => state.products.listProducts)
    const [productsSeatch, setProductsSearch] = useState([])

    const [currentPage, setCurrentPage] = useState(1)
    const productPerPage = 8    
    const indexOfLastList = currentPage * productPerPage
    const indexOfFirstList = indexOfLastList - productPerPage
    const currentListProducts = productsSeatch.length > 0 ? 
                                productsSeatch : 
                                productByCategory
    const totalPage = Math.ceil(currentListProducts.length / productPerPage)

    useEffect(() => {
        const temp = listProducts.filter((item) => item.productName?.toLowerCase().includes(state?.toLowerCase()))
        setProductsSearch(temp)
    }, [state])

    useEffect( () => {
        window.scrollTo({top: 0})
    }, [])

   
    //get all products
    useEffect(() => { getAllProduct(dispatch, setLoading) }, [])

    //get product by category
    useEffect(() => getProductByCategory(params.id, setLoading, setProductByCategory), [params.id])

    // useEffect( () => {
    //     const listItem = document.querySelector('.paginatio__item')
    //     console.log(listItem);
    // }, [])
    // console.log(listItemRef.current);

    const SortProducts = (e) => {
        // console.log(typeof(e.target.value));
        if (e.target.value === '0') {
            getAllProduct(dispatch, setLoading)
        }

        if (e.target.value === '1') {
            currentListProducts.sort( (a, b) => a.productName.localeCompare(b.productName))
            console.log(currentListProducts);
        }

        if (e.target.value === '2') {
            if (productsSeatch.length > 0) { //sort by products cost increase
                currentListProducts.sort( (a, b) => b.cost - a.cost)
            }
        }

        if (e.target.value === '3') {
            if (productsSeatch.length > 0) { //sort by products cost decrease
                currentListProducts.sort( (a, b) => a.cost - b.cost)
            }
        }
    }


    const handlePrePage = (e) => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = (e) => {
        if (currentPage <= totalPage) {
            setCurrentPage(currentPage + 1)
        }
    }

    // console.log(currentListProducts);

    return loading ? <Loading /> : (
        <>
            <Banner
                banner={banner}
            />
            <div className="section">
                <div className="container">
                    <div className="row">
                        {/* section filter */}
                        <div className="section__filter ">
                            <div className="section__filter-group ">
                                <label htmlFor="input-sort" className="control-lable">Sắp xếp theo:</label>
                                <select
                                    name="true"
                                    id="input-sort"
                                    className="col-md-6 col-sm-12"
                                    onChange={(e) => SortProducts(e)}
                                >
                                    <option value={0}>Mới trước cũ sau</option>
                                    <option value={1}>Tên sản phẩm</option>
                                    <option value={2}>Giá cao tới thấp</option>
                                </select>
                            </div>
                            {/* <div className="section__filter-group">
                                <label htmlFor="input-limit" className="control-lable">Hiển thị:</label>
                                <select name="true" id="input-limit" className="col-md-6 col-sm-12">
                                    <option value={0}>Chức năng này đang được cập nhật</option>
                                </select>
                            </div> */}
                        </div>
                    </div>
                    {/* section products */}
                    <div className="section__products">
                        {
                            // currentListProducts.length > 0 ?
                            //     currentListProducts.reverse().map((item, i) => (
                            //         <Product
                            //             key={i}
                            //             id={item._id}
                            //             productName={item.productName}
                            //             cost={item.cost}
                            //             img={item.images[0]}
                            //         />
                            //     )) :
                            // }
                            // {
                            currentListProducts && currentListProducts.length > 0 ?
                                currentListProducts.slice(indexOfFirstList, indexOfLastList)
                                                    .map((item, index) => (
                                                        <Product
                                                            key={index}
                                                            id={item._id}
                                                            productName={item.productName}
                                                            cost={item.cost}
                                                            img={item.images[0]}
                                                        />
                                                    )) :
                                                    <>

                                                        <FakeProducts />
                                                        <FakeProducts />
                                                        <FakeProducts />
                                                        <FakeProducts />
                                                    </>
                        }
                    </div>
                    < Pagination
                        totalPage={totalPage}
                        handlePrePage={handlePrePage}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        itemRef={listItemRef}
                    />
                </div>
            </div>

        </>
    )
}

export default StorePage;