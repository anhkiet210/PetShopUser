import axios from "axios"
import CartSlice from "./cartSlice"
import ProductSlice from "./productSlice"
import UserSlice from "./userSlice"

//get all product
export const getAllProduct = (dispatch, setLoading) => {
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://petshop347.herokuapp.com/api/products")
            const resData = await res.data
            const  dataSession = JSON.stringify(resData)
            dispatch(ProductSlice.actions.getlistProducts(resData))
            sessionStorage.setItem("listProducts", dataSession)
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
            setLoading(true)
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
            setLoading(true)
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
export const getProfile = (dispatch, header, setLoading) => {
    const fetchData = async () => {
        try {
            if(header.x_authorization === null){
                return
            }
            setLoading(true)
            const res = await axios.get(
                "https://petshop347.herokuapp.com/api/users/profile",
                {
                    headers: header
                }
            )
            const resUser = await res.data
            const {_id, name, birth, email, phone, gender, permission} = resUser
            dispatch(UserSlice.actions.loginSuccess({_id, name, birth, email, phone, gender, permission}))
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    fetchData()
}

//get my cart
export const getMyCart = (header, setLoading, dispatch) => {
    const fetchData = async () => {
        try {
            if(header.x_authorization === null){
                return
            }
            setLoading(true)
            const res = await axios.get("https://petshop347.herokuapp.com/api/carts/my-cart",
                {
                    headers: header
                }
            )
            const resData = await res.data.products
            dispatch(CartSlice.actions.addToCart(resData))
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    fetchData()
}

// add to cart
export const addToCart = (id, header, setLoading, cart, enqueueSnackbar) => {
    const reqAddToCart = async () => {
        const config = {
            method: "post",
            url: `https://petshop347.herokuapp.com/api/carts/${id}`,
            headers: header
        }
        try {
            setLoading(true)
            // console.log(cart);
            const resCheck = await axios.get(`https://petshop347.herokuapp.com/api/products/${id}`)
            const qty = await resCheck.data.quantity
            if(qty === 0){
                // alert("S???n ph???m n??y ???? h???t h??ng!")
                enqueueSnackbar("S???n ph???m ???? h???t h??ng", {
                    variant: "warning", 
                    autoHideDuration: 2000,
                })
                setLoading(false)
                return
            }
            if(header.x_authorization === null){
                // alert("B???n ch??a ????ng nh???p!")
                enqueueSnackbar("B???n ch??a ????ng nh???p", {
                    variant: "warning",
                    autoHideDuration: 2000,
                })
                setLoading(false)
                return
            }
            if (cart?.length === 0) {
                const res = await axios(config)
                if (res.status === 200) {
                    setLoading(false)
                    // alert("Th??m s???n ph???m th??nh c??ng")
                    enqueueSnackbar("Th??m s???n ph???m v??o gi??? th??nh c??ng", {
                        variant: "success",
                        autoHideDuration: 2000,
                    })
                    window.location.reload()
                }
            } else {
                const checkExiting = cart?.filter(item => item.idProduct === id)
                if (checkExiting?.length > 0) {
                    setLoading(false)
                    // alert("S???n ph???m ???? c?? trong gi??? h??ng")
                    enqueueSnackbar("S???n ph???m ???? c?? trong gi??? h??ng", {
                        variant: "warning", 
                        autoHideDuration: 2000,
                    })
                    return
                }
                await axios(config)
                setLoading(false)
                // alert("Th??m s???n ph???m th??nh c??ng")
                window.location.reload()
                enqueueSnackbar("Th??m s???n ph???m v??o gi??? th??nh c??ng", {
                    variant: "success",
                    autoHideDuration: 2000,
                })
            }
        } catch (err) {
            setLoading(false)
            console.log(err);
        }
    }

    reqAddToCart()
}

//remove product from cart
export const removeProductFromCart = (id, setLoading, header) => {
    const func = async () => {
        try {
            setLoading(true)
            const config = {
                method: "delete",
                url: `https://petshop347.herokuapp.com/api/carts/${id}`,
                headers: header,
            }
            const res = await axios(config)
            console.log(res);
            // setLoading(false)
            window.location.reload()
        } catch (err) {
            setLoading(false)
        }
    }

    func()
}

//get address for current user
export const getAddress = (header, setLoading, setAllAddress) => {
    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://petshop347.herokuapp.com/api/address/my-address",
                {
                    headers: header
                })
            const resAddress = await res.data
            setAllAddress(resAddress)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    fetchData()
}

// add address
export const addAddress = (header, address, setLoading) => {
    const resData = async () => {
        try {
            var config = {
                method: "post",
                url: "https://petshop347.herokuapp.com/api/address",
                headers: header,
                data: {
                    addressName: address
                }
            }
            setLoading(true)
            const res = await axios(config)
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    resData()
}

//get my order
export const getMyOrder = (header, setLoading, setMyOrder) => {
    const fetchData = async () => {
        try{
            if(header.x_authorization === null){
                return
            }
            setLoading(true)
            const res = await axios.get("https://petshop347.herokuapp.com/api/orders/my-orders", {
                headers: header
            })
            const resData = await res.data
            setMyOrder(resData)
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    }

    fetchData()
}

// get order
export const getOrder = (id, setLoading, setOrder) => {
    const fetchData = async () => {
        try{
            setLoading(true)
            const res = await axios.get(`https://petshop347.herokuapp.com/api/orders/${id}`)
            const resData = await res.data
            // console.log(resData);
            setOrder(resData)
            setLoading(false)
        }catch(err){
            setLoading(false)
        }
    }

    fetchData()
}

//delete order
export const DeleteOrder = (id, setLoading) => {
    const res = async () => {
        try{
            setLoading(true)
            const resData = await axios.delete(`https://petshop347.herokuapp.com/api/orders/${id}`);
            window.location.reload()
        }catch(err){
            setLoading(false)
        }
    }

    res()
}