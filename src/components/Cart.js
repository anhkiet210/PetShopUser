import React from "react";
import { useLocation } from "react-router-dom";

const Cart = () => {
    const {state} = useLocation()
    console.log(state);
    return (
        <>
            <div>
                <div className="cart-page">
                    <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Giỏ hàng của bạn</h2>
                    <div className="container" style={{ marginTop: '20px' }}>
                        <div className="row clearfix">
                            <table className="table table-bordered table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">#</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Mã sản phẩm</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '360px' }} scope="row">Tên sản phẩm</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Ảnh sản phẩm</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '125px' }} scope="row">Đơn giá</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle' }} scope="row">Số lượng</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '144px' }} scope="row">Thành tiền</th>
                                        <th style={{ textAlign: 'center', verticalAlign: 'middle', width: '70px' }} scope="row">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>1</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>MSHH01</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>Thức ăn cho chó </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <img width="50px" height="50px" src="../img/7.png" alt="" />
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>12.000đ</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <input type="number" name="true" className="ip-quantily-cart" defaultValue={1} max={50} min={1} style={{ width: '80px' }} /><br />
                                            {/* <span style="color:red;">Không đủ số lượng</span>
                          <input type="number" name="sl[<?=$row_giohang['idGioHang']?>]" value="<?=$SoLuong?>" max="50" min="1" style="width: 80px;"> */}
                                        </td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>12.000đ</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                            <button name="delete_giohang" value className="delete"><i className="fas fa-times" style={{ fontSize: '1.5rem' }} /></button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }} />
                                        <td style={{ textAlign: 'left', verticalAlign: 'middle', fontWeight: 'bold' }} colSpan={5}>TỔNG TIỀN</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle', color: 'red' }}>12.000đ</td>
                                        <td style={{ textAlign: 'center', verticalAlign: 'middle' }} />
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div style={{ textAlign: 'right' }} className="container">
                    <a href="checkout.php" className="btn btn-primary" style={{marginRight: '5px'}}>Đặt hàng</a>
                    {/* <button name="dat_hang" class="btn btn-primary">Đặt hàng</button> */}
                    <button name="update_giohang" className="btn btn-info">Cập nhật</button>
                </div>
                <div style={{ textAlign: 'right' }} className="container">
                    <span style={{ color: 'red', fontWeight: 'bold' }}>* Lưu ý các sản phẩm không đủ số lượng sẽ không được thêm vào đơn hàng</span>
                </div>
            </div>
        </>
    )
}

export default Cart;