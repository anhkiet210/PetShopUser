import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from 'react-router-dom'
import Loading from "./UI/Loading";

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

    const chuyenDoiURL = (str) => {
        // Chuyển hết sang chữ thường
        str = str.toLowerCase();

        // xóa dấu
        str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, 'a');
        str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, 'e');
        str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, 'i');
        str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, 'o');
        str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, 'u');
        str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, 'y');
        str = str.replace(/(đ)/g, 'd');

        // Xóa ký tự đặc biệt
        str = str.replace(/([^0-9a-z-\s])/g, '');

        // Xóa khoảng trắng thay bằng ký tự -
        str = str.replace(/(\s+)/g, '-');

        // xóa phần dự - ở đầu
        str = str.replace(/^-+/g, '');

        // xóa phần dư - ở cuối
        str = str.replace(/-+$/g, '');

        // return
        return str;
    }

    console.log();

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
                                    <NavLink to={`/store/${chuyenDoiURL(item.title)}.${item._id}`}>{item.title}</NavLink>
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