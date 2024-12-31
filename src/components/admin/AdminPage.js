import React from "react";
import { Button, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="admin-page"
      style={{ textAlign: "center", marginTop: "50px" }}
    >
      <Title level={1}>Welcome Admin</Title>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/admin/categories")}
        >
          Manage Categories
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/admin/products")}
        >
          Manage Products
        </Button>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => navigate("/admin/orders")}
        >
          Manage Orders
        </Button>
      </Space>
    </div>
  );
};

export default AdminPage;
