import axios from "axios"
import ProductSlice from "./productSlice"


//get all product
export const getAllProduct = (dispatch, setLoading) => {
    const fetchData = async () => {
        try {
            const res = await axios.get("https://petshop347.herokuapp.com/api/products")
            dispatch(ProductSlice.actions.getlistProducts(res.data))
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }
    fetchData()
}

//get product by id and get id category
export const getProductById = (id, setLoading, setCurrentProduct, setIdCategory) => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://petshop347.herokuapp.com/api/products/${id}`)
            setCurrentProduct(res.data)
            setIdCategory(res.data.idCategory)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    fetchData()
}

//get product by category
export const getProductByCategory = (id, setLoading, setProductByCategory) => {
    const fetchData = async () => {
        try {
            const res = await axios.get(`https://petshop347.herokuapp.com/api/products/by-category/${id}`)
            setProductByCategory(res.data)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    fetchData()
}

//get profile current user
export const getProfile = (setCurrentUser, header, setLoading) => {
    const fetchData = async () => {
        try{
            const res = await axios.get(
                "https://petshop347.herokuapp.com/api/users/profile", 
                {
                    headers: header
                }
            )
            const resUser = await res.data
            setCurrentUser(resUser)
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    }

    fetchData()
}