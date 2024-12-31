import React, { useState, useEffect } from "react";
import { Table, Button, Pagination, Typography, message, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const { Title } = Typography;

const AdminProductPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const response = await ApiService.getAllProducts(); // Assuming a paginated API
      setProducts(response.productDtoList || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      setError("Error fetching products.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Confirm Delete",
      content: "Are you sure you want to delete this product?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await ApiService.deleteProduct(id);
          messageApi.success("Product deleted successfully");
          fetchProducts(currentPage);
        } catch (error) {
          messageApi.error("Error deleting product");
          console.error("Error deleting product:", error);
        }
      },
    });
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => handleEdit(product.id)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(product.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="admin-product-list" style={{ padding: "20px" }}>
      {contextHolder}
      {error ? (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      ) : (
        <div>
          <Title level={2}>Products</Title>
          <Button
            type="primary"
            onClick={() => navigate("/admin/add-product")}
            style={{ marginBottom: "20px" }}
          >
            Add Product
          </Button>
          <Table
            dataSource={products}
            columns={columns}
            rowKey="id"
            loading={loading}
            pagination={false}
            bordered
          />
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Pagination
              current={currentPage}
              total={totalPages * 10}
              onChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;
