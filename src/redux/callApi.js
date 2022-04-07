import axios from "axios"
import CartSlice from "./cartSlice"
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

//get my cart
export const getMyCart = (header, setLoading, setMyCart, dispatch) => {
    const fetchData = async () => {
        try{
            setLoading(true)
            const res = await axios.get("https://petshop347.herokuapp.com/api/carts/my-cart", 
                {
                    headers: header
                }
            )
            const resData = await res.data.products
            dispatch(CartSlice.actions.addToCart(resData))
            setMyCart(resData)
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    }

    fetchData()
}

// add to cart
export const addToCart = (id, header, setLoading, cart) => {
    const reqAddToCart = async () => {
        const config = {
            method: "post",
            url: `https://petshop347.herokuapp.com/api/carts/${id}`,
            headers: header
        }
        try{
            setLoading(true)
            const checkExiting = cart.filter( item => item.idProduct === id)
            if(checkExiting.length > 0){
                setLoading(false)
                alert("Sản phẩm đã có trong giỏ hàng")
                return
            }
            const res = await axios(config)
            if(res.status === 200){
                setLoading(false)
                alert("Thêm sản phẩm thành công")
                window.location.href=""
            }
        }catch(err){
            setLoading(false)
        }
    }

    reqAddToCart()
}

//remove product from cart
export const removeProductFromCart = (id, setLoading, header) => {
    const func = async () => {
        try{
            setLoading(true)
            const config = {
                method: "delete",
                url: `https://petshop347.herokuapp.com/api/carts/${id}`,
                headers: header,
            }
            const res = await axios(config)
            console.log(res);
            setLoading(false)
            window.location.href=""
        }catch(err){
            setLoading(false)
        }
    }

    func()
}