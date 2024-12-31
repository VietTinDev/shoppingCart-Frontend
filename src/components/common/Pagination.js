import React from "react";
import { Pagination } from "antd";
import "../../style/pagination.css";

const CustomPagination = ({ currentPage = 1, totalPages = 0, onPageChange }) => {
    const totalItems = totalPages * 10;

    return (
        <div className="pagination-container" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Pagination
                current={currentPage}
                total={totalItems}
                onChange={onPageChange}
                showSizeChanger={false}
                pageSize={10}
            />
        </div>
    );
};

export default CustomPagination;
