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
import MyOrder from "../components/myOrder/MyOrder";
import DetailMyOrder from "../components/myOrder/DetailMyOrder";

const RootPage = () => {

  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <Routes>
      <Route
        path="/login"
        element={currentUser ? <Navigate to="/" /> : <Login />}
      />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/store" element={<Outlet />} >
        <Route path=":slug.:id.html" element={<StorePage />} />
      </Route>
      <Route path="/product" element={<Outlet />} >
        <Route path=":slug.:id.html" element={<ProductPage />} />
      </Route>
      <Route path="/introduce" element={<Introduce />} />
      <Route path="/my-account" element={localStorage.getItem("accessToken") ? <MyAccountPage /> : <Navigate to="/" />} />
      <Route path="/my-order" element={localStorage.getItem("accessToken") ? <MyOrder /> : <Navigate to="/" />} />
      <Route path="/detail-my-order" element={<Outlet />} >
        <Route path=":id" element={<DetailMyOrder />} />
      </Route>
    </Routes>
  )
}

export default RootPage;