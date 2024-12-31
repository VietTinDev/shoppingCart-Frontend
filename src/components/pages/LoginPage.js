import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";
import "../../style/login.css";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.loginUser(formData);
      if (response.status === 200) {
        setMessage("User Successfully Loged in");
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.role);
        setTimeout(() => {
          navigate("/profile");
        }, 4000);
      }
    } catch (error) {
      setMessage(
        error.response?.data.message ||
          error.message ||
          "unable to Login a user"
      );
    }
  };
  
  return (
    <>
      <div
        className="login-container"
        style={{ maxWidth: 400, margin: "auto", padding: "50px 20px" }}
      >
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>

        <Form
          onSubmitCapture={handleSubmit}
          initialValues={{ remember: true }}
          layout="vertical"
          style={{ maxWidth: 400, margin: "0 auto" }}
        >
          {/* Email input */}
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
              prefix={<UserOutlined />}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
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

          <Form.Item>
            <Button type="primary" htmlType="submit" block style={{ marginTop: 10 }}>
              Login
            </Button>
          </Form.Item>

          {/* Register link */}
          <Paragraph className="register-link" style={{ textAlign: "center" , color:"black"}}>
            Don't have an account? <a href="/register">Register</a>
          </Paragraph>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
