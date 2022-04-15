import axios from "axios";
import React, { useEffect, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddProduct = () => {

    const [validated, setValidated] = useState(false);
    const [categories, setCategories] = useState();
    const [productName, setProductName] = useState();
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [cost, setCost] = useState();
    const [category, setCategory] = useState();
    const [images, setImages] = useState([]);
    const [urlFile, setUrlFile] = useState([]);

    const handleName = (e) => {
        setProductName(e.target.value);
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const handleCost = (e) => {
        setCost(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    const handleImages = (e) => {
        setImages(e.target.files);
        const urlArray = [];
        for (let i = 0; i < e.target.files.length; i++) {
            urlArray.push(URL.createObjectURL(e.target.files[i]));
        }
        setUrlFile(urlArray);
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            const uploadData = new FormData();
            for (let i = 0; i < images.length; i++) {
                uploadData.append("file", images[i]);
            }
            uploadData.append("productName", productName);
            uploadData.append("description", description);
            uploadData.append("quantity", quantity);
            uploadData.append("cost", cost);
            uploadData.append("idCategory", category);

            axios.post('https://petshop347.herokuapp.com/api/products', uploadData, {
                headers: {
                    x_authorization: localStorage.getItem('accessToken')
                }
            })
                .then(res => {
                    window.alert('Thêm sản phẩm thành công!');
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }

        setValidated(true);
    };

    useEffect(() => {
        axios.get('https://petshop347.herokuapp.com/api/categories')
            .then(res => {
                setCategories(res.data);
                setCategory(res.data[0]._id);
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        return () => {
            urlFile && urlFile.map(url => {
                URL.revokeObjectURL(url);
            })
        }
    }, [urlFile])

    // console.log(categories);
    // console.log(images);

    return (
        <>
            <div className="section">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-12">
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className="block">
                                    <div className="block__header">
                                        <h2>Thêm sản phẩm</h2>
                                    </div>
                                    <div className="block__body">
                                        <div className="form-group">
                                            <h3>Tên sản phẩm</h3>
                                            <input type="text" className="form-input" placeholder="Nhập tên sản phẩm" required onChange={(e) => handleName(e)} />
                                        </div>
                                        <div className="form-group">
                                            <h3>Ảnh</h3>
                                            {/* <img src="../img/load.jpg" alt="" /> */}
                                            <label htmlFor="imgsp" className="btn btn-info">Hãy chọn ảnh <i className="fas fa-cloud-upload" /></label>
                                            <input type="file" multiple id="imgsp" className="form-input-file" required onChange={(e) => handleImages(e)} />
                                        </div>
                                        {
                                            urlFile && urlFile.map(url => {
                                                return (
                                                    <img key={url} style={{ width: '50px', height: '50px', marginRight: '10px', marginBottom: '10px' }} src={url} alt='' />
                                                );
                                            })
                                        }
                                        <div className="form-group">
                                            <h3>Giá</h3>
                                            <input type="number" className="form-input" placeholder="Nhập giá sản phẩm" required onChange={(e) => handleCost(e)} />
                                        </div>
                                        <div className="form-group">
                                            <h3>Số lượng</h3>
                                            <input type="number" className="form-input" placeholder="Nhập số lượng sản phẩm" required onChange={(e) => handleQuantity(e)} />
                                        </div>
                                        <div className="form-group">
                                            <h3>Danh mục sản phẩm</h3>
                                            <select  className="form-input-select" onChange={(e) => handleCategory(e)}>
                                                {
                                                    categories &&
                                                    categories.map((item, i) => (
                                                        <option value={item._id} key={i}>{item.title}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <h3>Mô tả sản phẩm</h3>
                                            {/* <textarea cols={30} rows={10} style={{ width: '100%', backgroundColor: 'transparent' }} defaultValue={""} /> */}
                                            <CKEditor
                                                editor={ClassicEditor}
                                                onChange={(event, editor) => {
                                                    const data = editor.getData();
                                                    setDescription(data);
                                                }}
                                            />
                                        </div>
                                        <input type="submit" defaultValue="Thêm" className="block__btn" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default AddProduct;