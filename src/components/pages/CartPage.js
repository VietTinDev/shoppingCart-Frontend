import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";
import { List, Button, InputNumber, Typography, Divider, Alert, Image, message as antMessage } from "antd";
import "../../style/cart.css";

const { Title, Text } = Typography;

const CartPage = () => {
  const { cart, dispatch } = useCart();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const incrementItem = (product) => {
    dispatch({ type: "INCREMENT_ITEM", payload: product });
  };

  const decrementItem = (product) => {
    const cartItem = cart.find((item) => item.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      dispatch({ type: "DECREMENT_ITEM", payload: product });
    } else {
      dispatch({ type: "REMOVE_ITEM", payload: product });
    }
  };

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!ApiService.isAuthenticated()) {
      antMessage.warning("You need to login first before you can place an order");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const orderRequest = {
      totalPrice,
      items: orderItems,
    };

    try {
      const response = await ApiService.createOrder(orderRequest);
      antMessage.success(response.message || "Order placed successfully!");
      if (response.status === 200) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (error) {
      antMessage.error(error.response?.data?.message || error.message || "Failed to place an order");
    }
  };

  return (
      <div className="cart-page" style={{padding: '20px', backgroundColor: '#f9f9f9'}}>
        <Title level={1} style={{textAlign: 'center', fontWeight: 700}}>Your Cart</Title>
        {message && <Alert message={message} type="info" showIcon style={{marginBottom: '15px'}}/>}

        {cart.length === 0 ? (
            <Alert message="Your cart is empty" type="warning" showIcon
                   style={{textAlign: 'center', marginTop: '20px'}}/>
        ) : (
            <div>
              <List
                  itemLayout="horizontal"
                  dataSource={cart}
                  renderItem={(item) => (
                      <List.Item style={{borderBottom: '1px solid #e8e8e8', padding: '10px 0'}}>
                        <List.Item.Meta
                            avatar={<Image width={80} src={`data:image/png;base64,${item.imageUrl}`} alt={item.name}
                                           style={{borderRadius: '8px'}}/>}
                            title={<Title level={4} style={{margin: 0}}>{item.name}</Title>}
                            description={
                              <div>
                                <Text>{item.description}</Text>
                                <div className="quantity-controls"
                                     style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                  <Button
                                      onClick={() => decrementItem(item)}
                                      //disabled={item.quantity === 1}
                                      style={{
                                        marginRight: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: '#f4f4f4',
                                        borderColor: '#d9d9d9'
                                      }}
                                  >
                                    -
                                  </Button>
                                  <InputNumber
                                      min={1}
                                      value={item.quantity}
                                      readOnly
                                      style={{
                                        width: '60px',
                                        textAlign: 'center',
                                        borderRadius: '5px',
                                        margin: '0 10px'
                                      }}
                                  />
                                  <Button
                                      onClick={() => incrementItem(item)}
                                      style={{
                                        marginLeft: '10px',
                                        borderRadius: '5px',
                                        backgroundColor: '#f4f4f4',
                                        borderColor: '#d9d9d9'
                                      }}
                                  >
                                    +
                                  </Button>
                                </div>
                                <Text strong style={{
                                  display: 'block',
                                  marginTop: '10px',
                                  fontSize: '16px'
                                }}>${item.price.toFixed(2)}</Text>
                              </div>
                            }
                        />
                      </List.Item>
                  )}
              />
              <Divider style={{margin: '20px 0'}}/>
              <div className="cart-total"
                   style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Title level={2} style={{fontWeight: 700}}>Total: ${totalPrice.toFixed(2)}</Title>
                <Button
                    type="primary"
                    size="large"
                    className="checkout-button"
                    onClick={handleCheckout}
                    style={{backgroundColor: '#1890ff', borderColor: '#1890ff', borderRadius: '5px'}}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
        )}
      </div>
  );
};

export default CartPage;
