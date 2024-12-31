import React, { useState } from "react";
import { Form, Input, Button, Typography, notification } from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../style/register.css";

const { Title, Paragraph } = Typography;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phoneNumber: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.email &&
      formData.name &&
      formData.phoneNumber &&
      formData.password
    ) {
      notification.success({
        message: "Registration Successful",
        description: "You have successfully registered.",
      });
      navigate("/login");
    } else {
      notification.error({
        message: "Registration Failed",
        description: "Please fill in all the required fields.",
      });
    }
  };

  return (
    <div
      className="register-container"
      style={{ maxWidth: 400, margin: "auto", padding: "50px 20px" }}
    >
      <Title level={2} style={{ textAlign: "center" }}>
        Register
      </Title>

      <Form
        onSubmitCapture={handleSubmit}
        initialValues={{ remember: true }}
        layout="vertical"
        style={{ maxWidth: 400, margin: "0 auto" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Item>

        {/* Name input */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </Form.Item>

        {/* Phone number input */}
        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </Form.Item>

        {/* Password input */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </Form.Item>

        {/* Submit button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginTop: 10 }}
          >
            Register
          </Button>
        </Form.Item>

        {/* Login link */}
        <Paragraph className="login-link" style={{ textAlign: "center", color:"black" }}>
          Already have an account? <a href="/login">Login</a>
        </Paragraph>
      </Form>
    </div>
  );
};

export default RegisterPage;
