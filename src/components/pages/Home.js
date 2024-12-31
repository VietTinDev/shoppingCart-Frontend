import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductList from "../common/ProductList";
import ApiService from "../../service/ApiService";
import { Typography, Spin, Alert } from "antd";
import "../../style/home.css";
import CustomPagination from "../common/Pagination";

const { Title } = Typography;

const HomePage = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        let allProducts = [];
        const queryParams = new URLSearchParams(location.search);
        const searchItem = queryParams.get("search");

        // Kiểm tra và gọi API tương ứng
        if (searchItem) {
          const response = await ApiService.searchProducts(searchItem, currentPage, itemsPerPage);
          allProducts = response.productDtoList || []; // Kiểm tra dữ liệu từ API
          setTotalPages(response.totalPages); // Nếu API trả về số trang
        } else {
          const response = await ApiService.getAllProducts(currentPage, itemsPerPage);
          console.log(response.productDtoList);
          allProducts = response.productDtoList || []; // Kiểm tra dữ liệu từ API
          setTotalPages(response.totalPages); // Nếu API trả về số trang
        }

        // Cập nhật sản phẩm cho trang hiện tại
        setProducts(allProducts);
      } catch (error) {
        // Xử lý lỗi tốt hơn
        setError(error?.response?.data?.message || error.message || "Unable to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search, currentPage, itemsPerPage]);



  return (
      <div className="home">
        <Title level={2} className="home-title">
          Our Products
        </Title>
        {loading ? (
            <Spin size="large" className="loading-spinner" />
        ) : error ? (
            <Alert message="Error" description={error} type="error" showIcon />
        ) : (
            <>
              <ProductList products={products} />
              <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
              />
            </>
        )}
      </div>
  );
};

export default HomePage;
