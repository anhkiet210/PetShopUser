import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Loading from "./UI/Loading";
import { chuyenDoiURL } from "../redux/changeText";

const Navigation = () => {

    const [loading, setLoading] = useState(true)
    const [category, setCategory] = useState([])

    //get all category
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("https://petshop347.herokuapp.com/api/categories")
                const resData = await res.data
                setCategory(resData)
                setLoading(false)
            } catch (err) {
                setLoading(false)
            }
        }
        fetchData()
    }, [])


    return loading ? <Loading /> : (
        <nav className="navigation">
            <div className="container">
                <div className="row">
                    <ul className="nav">
                        <li><NavLink to="/" activeclassname="active">Trang chủ</NavLink></li>
                        {
                            category &&
                            category.map((item, index) => (
                                <li key={index}>
                                    <NavLink to={`/store/${chuyenDoiURL(item.title)}.${item._id}.html`}>{item.title}</NavLink>
                                </li>
                                // console.log(chuyenDoiURL(item.title))
                            ))
                        }
                        <li><NavLink to="/introduce">Giới thiệu</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;