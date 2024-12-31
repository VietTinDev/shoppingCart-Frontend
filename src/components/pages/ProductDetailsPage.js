import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";
import { Card, Button, Spin, Typography, Row, Col, Image, Space } from "antd";
// import '../../style/productDetailsPage.css';

const { Title, Paragraph } = Typography;

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getProductById(productId);
      setProduct(response.product);
    } catch (error) {
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch({ type: "ADD_ITEM", payload: product });
    }
  };

  const incrementItem = () => {
    if (product) {
      dispatch({ type: "INCREMENT_ITEM", payload: product });
    }
  };

  const decrementItem = () => {
    if (product) {
      const cartItem = cart.find((item) => item.id === product.id);
      if (cartItem && cartItem.quantity > 1) {
        dispatch({ type: "DECREMENT_ITEM", payload: product });
      } else {
        dispatch({ type: "REMOVE_ITEM", payload: product });
      }
    }
  };

  if (loading) {
    return (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  const cartItem = cart.find((item) => item.id === product.id);

  return (
      <Row justify="center" align="middle" style={{ marginTop: "20px" }}>
        <Col xs={24} sm={16} md={12} lg={10}>
          <Card hoverable>
            <Image src={product?.imageUrl} alt={product?.name} style={{ marginBottom: "20px" }} />
            <Title level={3}>{product?.name}</Title>
            <Paragraph>{product?.description}</Paragraph>
            <Title level={4}>${product?.price.toFixed(2)}</Title>

            {cartItem ? (
                <Space size="large">
                  <Button type="primary" onClick={decrementItem}>-</Button>
                  <span>{cartItem.quantity}</span>
                  <Button type="primary" onClick={incrementItem}>+</Button>
                </Space>
            ) : (
                <Button type="primary" onClick={addToCart}>Add To Cart</Button>
            )}
          </Card>
        </Col>
      </Row>
  );
};

export default ProductDetailsPage;
