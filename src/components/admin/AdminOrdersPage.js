import React, { useState, useEffect } from "react";
import { Table, Button, Select, Pagination, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

const { Title } = Typography;
const { Option } = Select;

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const OrderStatus = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
    "RETURNED",
  ];

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    setLoading(true);
    try {
      const response = await ApiService.getAllOrders();
      console.log(response);// Assuming paginated API
      setOrders(response.orderItemDtoList || []);
      setFilteredOrders(response.orderItemDtoList || []);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError("Error fetching orders.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };


  const handleFilterChange = (value) => {
    setStatusFilter(value);
    const filtered = value
      ? orders.filter((order) => order.status === value)
      : orders;
    setFilteredOrders(filtered);
  };

  const handleSearchStatusChange = (value) => {
    setSearchStatus(value);
    const searched = value
      ? orders.filter((order) => order.status.includes(value))
      : orders;
    setFilteredOrders(searched);
  };

  const handleOrderDetails = (id) => {
    navigate(`/admin/order-details/${id}`);
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: ["user", "name"],
      key: "customer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Date Ordered",
      dataIndex: "createdAt",
      key: "dateOrdered",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, order) => (
        <Button type="link" onClick={() => handleOrderDetails(order.id)}>
          Details
        </Button>
      ),
    },
  ];

  return (
    <div className="admin-orders-page" style={{ padding: "20px" }}>
      <Title level={2}>Orders</Title>

      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <div
        className="filter-container"
        style={{ marginBottom: "20px", display: "flex", gap: "20px" }}
      >
        <div className="statusFilter">
          <label>Filter By Status:</label>
          <Select
            value={statusFilter}
            onChange={handleFilterChange}
            style={{ width: "200px", marginLeft: "10px" }}
          >
            <Option value="">All</Option>
            {OrderStatus.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </div>
        <div className="searchStatus">
          <label>Search By Status:</label>
          <Select
            value={searchStatus}
            onChange={handleSearchStatusChange}
            style={{ width: "200px", marginLeft: "10px" }}
          >
            <Option value="">All</Option>
            {OrderStatus.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <Table
        dataSource={filteredOrders}
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
  );
};

export default AdminOrdersPage;
