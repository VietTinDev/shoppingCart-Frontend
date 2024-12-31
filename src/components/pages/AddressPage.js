import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Typography, Form, Input, Button, Alert, Card } from "antd";
//import "../../style/address.css";

const { Title } = Typography;

const AddressPage = () => {
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/edit-address') {
      fetchUserInfo();
    }
  }, [location.pathname]);

  const fetchUserInfo = async () => {
    try {
      const response = await ApiService.getLoggedInUserInfo();
      if (response.user.addressDto) {
        setAddress(response.user.addressDto);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to fetch user information");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await ApiService.saveAddress(address);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Failed to save/update address");
    }
  };

  return (
      <div className="address-page">
        <Card style={{ maxWidth: 600, margin: "auto" }}>
          <Title level={2}>
            {location.pathname === '/edit-address' ? 'Edit Address' : 'Add Address'}
          </Title>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 20 }} />}

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
                label="Street"
                name="street"
                rules={[{ required: true, message: "Please input your street!" }]}
            >
              <Input
                  name="street"
                  value={address.street}
                  onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
                label="State"
                name="state"
                rules={[{ required: true, message: "Please input your state!" }]}
            >
              <Input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
                label="Zip Code"
                name="zipCode"
                rules={[
                  { required: true, message: "Please input your zip code!" },
                  { pattern: /^\d{5}$/, message: "Zip code must be a 5-digit number!" }
                ]}
            >
              <Input
                  name="zipCode"
                  value={address.zipCode}
                  onChange={handleChange}
              />
            </Form.Item>

            <Form.Item
                label="Country"
                name="country"
                rules={[{ required: true, message: "Please input your country!" }]}
            >
              <Input
                  name="country"
                  value={address.country}
                  onChange={handleChange}
              />
            </Form.Item>

            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  block
              >
                {location.pathname === '/edit-address' ? 'Edit Address' : 'Save Address'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
  );
};

export default AddressPage;
