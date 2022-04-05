import React from "react";
import {
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Cart from "../components/Cart";
import Login from "../components/Login";
import Register from "../components/Register";
import CheckoutPage from "./checkoutPage";
import Home from "./homePage";
import ProductPage from "./productPage";
import StorePage from "./storePage";
import { useSelector } from "react-redux";
import Introduce from "./introduce";
import MyAccountPage from "./myAccountPage";

const RootPage = () => {

  const currentUser = useSelector( state => state.user.currentUser)

  return (
    <Routes>
      <Route 
        path="/login" 
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/register" element= {<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Checkout" element={<CheckoutPage />} />
      <Route path="/store" element={<Outlet />} >
        <Route path=":slug.:id.html" element={<StorePage />} />
      </Route>
      <Route path="/product" element={<Outlet />} >
        <Route path=":slug.:id.html" element={<ProductPage />}/>
      </Route>
      <Route path="/introduce" element={<Introduce />} />
      <Route path="/my-account" element={localStorage.getItem("accessToken") ? <MyAccountPage /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default RootPage;