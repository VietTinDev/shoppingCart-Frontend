import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Button,
  Select,
  Typography,
  message,
  Descriptions,
  Divider,
} from "antd";
import ApiService from "../../service/ApiService";

const { Title, Text } = Typography;
const { Option } = Select;

const OrderStatus = [
  "PENDING",
  "CONFIRMED",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
  "RETURNED",
];

const AdminOrderDetailsPage = () => {
  const { itemId } = useParams();
  const [orderItems, setOrderItems] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    fetchOrderDetails(itemId);
  }, [itemId]);

  const fetchOrderDetails = async (itemId) => {
    try {
      const response = await ApiService.getOrderItemById(itemId);
      setOrderItems(response.orderItemDtoList);
    } catch (error) {
      messageApi.error(error.message || "Failed to fetch order details");
    }
  };

  const handleStatusChange = (orderItemId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderItemId]: newStatus });
  };

  const handleSubmitStatusChange = async (orderItemId) => {
    try {
      await ApiService.updateOrderitemStatus(
        orderItemId,
        selectedStatus[orderItemId]
      );
      messageApi.success("Order item status successfully updated");
      fetchOrderDetails(itemId); // Refresh order details
    } catch (error) {
      messageApi.error(
        error.response?.data?.message || "Unable to update order item status"
      );
    }
  };

  return (
    <div className="order-details-page" style={{ padding: "20px" }}>
      {contextHolder}
      <Title level={2}>Order Details</Title>
      {orderItems.length ? (
        orderItems.map((orderItem) => (
          <Card key={orderItem.id} style={{ marginBottom: "20px" }}>
            <Descriptions title="Order Information" bordered>
              <Descriptions.Item label="Order Item ID">
                {orderItem.id}
              </Descriptions.Item>
              <Descriptions.Item label="Quantity">
                {orderItem.quantity}
              </Descriptions.Item>
              <Descriptions.Item label="Total Price">
                ${orderItem.price}
              </Descriptions.Item>
              <Descriptions.Item label="Order Status">
                {orderItem.status}
              </Descriptions.Item>
              <Descriptions.Item label="Date Ordered">
                {new Date(orderItem.createdAt).toLocaleDateString()}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="User Information" bordered>
              <Descriptions.Item label="Name">
                {orderItem.user.name}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {orderItem.user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                {orderItem.user.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {orderItem.user.role}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Delivery Address" bordered>
              <Descriptions.Item label="Country">
                {orderItem.user.address?.country}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {orderItem.user.address?.state}
              </Descriptions.Item>
              <Descriptions.Item label="City">
                {orderItem.user.address?.city}
              </Descriptions.Item>
              <Descriptions.Item label="Street">
                {orderItem.user.address?.street}
              </Descriptions.Item>
              <Descriptions.Item label="Zip Code">
                {orderItem.user.address?.zipcode}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Descriptions title="Product Information" bordered>
              <Descriptions.Item label="Image">
                <img
                  src={orderItem.product.imageUrl}
                  alt={orderItem.product.name}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              </Descriptions.Item>
              <Descriptions.Item label="Name">
                {orderItem.product.name}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {orderItem.product.description}
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                ${orderItem.product.price}
              </Descriptions.Item>
            </Descriptions>

            <Divider />

            <Title level={4}>Change Status</Title>
            <Select
              value={selectedStatus[orderItem.id] || orderItem.status}
              onChange={(value) => handleStatusChange(orderItem.id, value)}
              style={{ width: "200px", marginBottom: "10px" }}
            >
              {OrderStatus.map((status) => (
                <Option key={status} value={status}>
                  {status}
                </Option>
              ))}
            </Select>
            <Button
              type="primary"
              onClick={() => handleSubmitStatusChange(orderItem.id)}
            >
              Update Status
            </Button>
          </Card>
        ))
      ) : (
        <Text>Loading order details...</Text>
      )}
    </div>
  );
};

export default AdminOrderDetailsPage;
