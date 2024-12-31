import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Card, Button, Row, Col, Typography, Space } from "antd";
import { PlusOutlined, MinusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "../../style/productList.css";

const { Title, Text } = Typography;

const ProductList = ({ products }) => {
    const { cart, dispatch } = useCart();

    const addToCart = (product) => {
        dispatch({ type: "ADD_ITEM", payload: product });
    };

    return (
        <div className="product-list" style={{padding: '20px', backgroundColor: '#f9f9f9'}}>
            <Row gutter={[16, 16]}>
                {products.map((product) => {
                    return (
                        <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
                            <Card
                                hoverable
                                style={{borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}
                                cover={
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={`data:image/png;base64,${product.imageUrl}`}
                                            alt={product.name}
                                            style={{
                                                height: "250px",
                                                objectFit: "cover",
                                                borderTopLeftRadius: '8px',
                                                borderTopRightRadius: '8px',
                                            }}
                                        />
                                    </Link>
                                }
                                actions={[
                                        <Button
                                            type="primary"
                                            icon={<ShoppingCartOutlined/>}
                                            onClick={() => addToCart(product)}
                                            style={{
                                                borderRadius: '5px',
                                                backgroundColor: '#1890ff',
                                                borderColor: '#1890ff',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Add to Cart
                                        </Button>
                                ]}
                            >
                                <Card.Meta
                                    title={<Title level={3} style={{
                                        marginBottom: '5px',
                                        fontWeight: '600'
                                    }}>{product.name}</Title>}
                                    description={
                                        <>
                                            <Text style={{fontSize: '14px', color: '#555',fontWeight: '700'}}>{product.description}</Text>
                                            <br/>
                                            <Text
                                                strong
                                                style={{
                                                    color: "#4CAF50",
                                                    fontSize: '16px',
                                                    fontWeight: '600',
                                                }}
                                            >
                                                ${product.price.toFixed(2)}
                                            </Text>
                                        </>
                                    }
                                />
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>

    );
};

export default ProductList;
