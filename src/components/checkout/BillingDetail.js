import React from "react";

const BillingDetail = (props) => {
    // console.log(props);
    return (
        <div className="billing-details">
            <div className="title-info">
                <h3 className="title" style={{ marginBottom: '20px' }}>thông tin giao hàng</h3>
            </div>
            <div className="form-group">
                <input 
                disabled 
                className="input" 
                type="text" 
                name="hoten" 
                placeholder="Họ tên" 
                defaultValue={props.infoUser?.name}
                />
            </div>
            <div className="form-group">
                <input 
                disabled 
                className="input" 
                type="text" 
                name="hoten" 
                placeholder="Email" 
                defaultValue={props.infoUser?.email}
                />
            </div>
            <div className="form-group">
                <input 
                required 
                className="input" 
                type="tel" 
                name="sodienthoai" 
                placeholder="Số điện thoại"
                defaultValue={props.infoUser?.phone}
                disabled
                />
            </div>
            <div className="form-group">
                <select 
                name="diachi" 
                className="input-select" 
                style={{ width: '72%' }}
                onChange={(e) => props?.getAddressOrder(e)}
                >
                    <option value="Chọn địa chỉ" >Hãy chọn địa chỉ giao hàng</option>
                    {
                        props.address &&
                        props.address?.map( (item, i) => (
                            <option 
                            value={item.addressName} 
                            key={i}
                            >{item.addressName}</option>
                        ))
                    }
                </select>
                <button 
                className="btn add-address" 
                id="add-address"
                onClick={() => props?.handle()}
                >Thêm đại chỉ mới</button>
            </div>
        </div>
    )
}

export default BillingDetail;