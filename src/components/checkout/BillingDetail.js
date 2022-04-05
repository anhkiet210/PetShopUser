import React from "react";

const BillingDetail = () => {
    return (
        <div className="billing-details">
            <div className="title-info">
                <h3 className="title" style={{ marginBottom: '20px' }}>thông tin giao hàng</h3>
            </div>
            <div className="form-group">
                <input disabled className="input" type="text" name="hoten" placeholder="Họ tên" />
            </div>
            <div className="form-group">
                <input required className="input" type="tel" name="sodienthoai" placeholder="Số điện thoại"/>
            </div>
            <div className="form-group">
                <select name="diachi" className="input-select" style={{ width: '72%' }}>
                    <option value={0}>Hãy chọn địa chỉ giao hàng</option>
                    <option value={1}>Bạc Liêu</option>
                    <option value={2}>Sóc Trăng</option>
                </select>
                <button className="btn btn-info add-address" id="add-address" style={{ marginBottom: '7px', color: '#fff', cursor: 'pointer' }}>Thêm đại chỉ mới</button>
            </div>
        </div>
    )
}

export default BillingDetail;