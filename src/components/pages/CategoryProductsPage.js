import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { List, Card, Pagination, Spin, Alert, Typography } from "antd";
import ApiService from "../../service/ApiService";
import '../../style/categoryListPage.css';

const { Title } = Typography;

const CategoryProductsPage = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchProducts();
    }, [categoryId, currentPage]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await ApiService.getAllProductsByCategoryId(categoryId);
            const allProducts = response.productDtoList || [];
            setTotalPages(Math.ceil(allProducts.length / itemsPerPage));
            setProducts(allProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unable to fetch products by category ID");
        } finally {
            setLoading(false);
        }
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (
            <div className="loading-spinner">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="home">
            {error ? (
                <Alert message="Error" description={error} type="error" showIcon />
            ) : (
                <div>
                    <Title level={2}>Products</Title>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 2,
                            md: 3,
                            lg: 4,
                        }}
                        dataSource={products}
                        renderItem={(product) => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={
                                        <img
                                            alt={product.name}
                                            src={`data:image/png;base64,${product.imageUrl}`}
                                            style={{ height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                    }
                                    style={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    hoverable
                                >
                                    <Card.Meta
                                        title={<span style={{ fontWeight: 'bold', fontSize: '16px' }}>{product.name}</span>}
                                        description={<span style={{ color: '#4CAF50', fontSize: '14px' }}>${product.price.toFixed(2)}</span>}
                                    />
                                </Card>
                            </List.Item>

                        )}
                    />
                    <Pagination
                        current={currentPage}
                        total={totalPages * itemsPerPage}
                        pageSize={itemsPerPage}
                        onChange={onPageChange}
                        style={{ marginTop: "20px", textAlign: "center" }}
                    />
                </div>
            )}
        </div>
    );
};

export default CategoryProductsPage;
