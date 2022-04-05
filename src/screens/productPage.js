import React, { useEffect, useState } from "react";
import ListProduct from "../components/product/ListProducts";
import ProductDescription from "../components/product/ProductDescription";
import ProductDetail from "../components/product/ProductDetail";
import ProductImg from "../components/product/ProductImg";
import { useParams } from "react-router-dom";
import Loading from "../components/UI/Loading";
import { getProductById, getProductByCategory } from "../redux/callApi";


const ProductPage = () => {
    const params = useParams()
    const [loading, setLoading] = useState(true)
    const [currentProduct, setCurrentProduct] = useState()
    const [productByCategory, setProductByCategory] = useState()
    const [idCategory, setIdCategory] = useState()

    //get current product
    useEffect( () => getProductById(params.id, setLoading, setCurrentProduct, setIdCategory), [params.id])
    //get related products
    useEffect( () => getProductByCategory(idCategory, setLoading, setProductByCategory), [idCategory])


    return loading ? <Loading /> : (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7 col-md-7 col-sm-12 col-xs-12">
                        {
                            currentProduct && 
                            <ProductImg 
                                productName={currentProduct.productName}
                                img={currentProduct.images}
                            />
                        }
                    </div>
                    <div className="col-lg-5 col-md-5 col-sm-12 col-xs-12">
                        {
                            currentProduct &&
                            <ProductDetail 
                                productName={currentProduct.productName}
                                cost={currentProduct.cost}
                            />
                        }
                    </div>
                </div>
            </div>
            {
                currentProduct && <ProductDescription description={currentProduct.description} />
            }
            <hr style={{ borderColor: '#95a5a6', maxWidth: '850px', margin: '20px auto' }} />
            {
                productByCategory &&
                <ListProduct 
                    title="Sản phẩm liên quan"
                    product={productByCategory}
                    indexLast={4}
                />

            }
        </>
    )
}

export default ProductPage;