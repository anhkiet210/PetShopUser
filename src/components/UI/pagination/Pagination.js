import React, { useEffect, useState } from "react";
import './pagination.css'


const Pagination = (props) => {

    const pageNumbers = []
    for (let i = 1; i <= props?.totalPage; i++) {
        pageNumbers.push(i)
    }


    return (
        <div className="pagination" >
            <div className="pagination__wrap">
                {
                    props?.currentPage > 1 &&
                    <button className="pre" onClick={(e) => props?.handlePrePage(e)}><i className="fas fa-angle-left"></i></button>
                }
                <div className="pagination__wrap-item" ref={props?.itemRef}>
                    {/* <button className="pagination__item active" value={1} onClick={(e) => props?.handlePagination(e)}>1</button> */}
                    {
                        pageNumbers &&
                        pageNumbers
                            .map((item, i) => (
                                <button
                                    className={`pagination__item ${i+1  === props.currentPage ? 'active' : null}`}
                                    type="button"
                                    value={item}
                                    onClick={(e) => props?.handlePagination(e)}
                                    key={i}
                                >
                                    {item}
                                </button>
                            ))
                    }
                </div>
                {
                    props?.currentPage < props?.totalPage &&
                    <button className="next" onClick={(e) => props?.handleNextPage(e)}><i className="fas fa-angle-right"></i></button>
                }
            </div>
        </div>
    )
}
export default Pagination;