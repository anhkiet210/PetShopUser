import React, {useEffect, useState} from "react";
import Banner from "../components/UI/Banner";
import Product from "../components/product/Product";
import { useParams } from "react-router-dom";
import {getProductByCategory} from '../redux/callApi'
import Loading from '../components/UI/Loading'
import FakeProducts from '../components/product/fakeProducts'

const StorePage = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [productByCategory, setProductByCategory] = useState()
    //get product by category
    useEffect( () => getProductByCategory(params.id, setLoading, setProductByCategory), [params.id])

    return loading ? <Loading /> :(
        <>
            <Banner />
            <div className="section">
                <div className="container">
                    <div className="row">
                        {/* section filter */}
                        <div className="section__filter ">
                            <div className="section__filter-group ">
                                <label htmlFor="input-sort" className="control-lable">Sắp xếp theo:</label>
                                <select name="true" id="input-sort" className="col-md-6 col-sm-12">
                                    <option value={0}>Chức năng này đang được cập nhật</option>
                                </select>
                            </div>
                            <div className="section__filter-group">
                                <label htmlFor="input-limit" className="control-lable">Hiển thị:</label>
                                <select name="true" id="input-limit" className="col-md-6 col-sm-12">
                                    <option value={0}>Chức năng này đang được cập nhật</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* section products */}
                    <div className="section__products">
                        {
                            productByCategory && productByCategory.length > 0 ? 
                            productByCategory.map((item, index) => (
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
                </div>
            </div>

        </>
    )
}

export default StorePage;