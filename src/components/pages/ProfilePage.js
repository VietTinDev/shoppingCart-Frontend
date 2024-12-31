import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { Typography, Button, List, Card, Avatar, Image, Alert, Pagination as AntPagination } from "antd";
import "../../style/profile.css";

const { Title, Text } = Typography;

const ProfilePage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [address, setAdress] = useState(null);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        try {
            const response = await ApiService.getLoggedInUserInfo();
            setUserInfo(response.userDto);
            setAdress(response.addressDto)
        } catch (error) {
            setError(error.response?.data?.message || error.message || "Unable to fetch user info");
        }
    };

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const handleAddressClick = () => {
        navigate(userInfo.address ? "/edit-address" : "/add-address");
    };

    const orderItemList = userInfo.orderItemList || [];
    const totalPages = Math.ceil(orderItemList.length / itemsPerPage);

    const paginatedOrders = orderItemList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    console.log(orderItemList);

    return (
        <div className="profile-page" style={{padding: "20px", backgroundColor: "#f9f9f9"}}>
            <Title level={2} style={{textAlign: "center", marginBottom: "20px"}}>
                Welcome, {userInfo.name}
            </Title>

            {error ? (
                <Alert message={error} type="error" showIcon style={{marginBottom: "20px"}}/>
            ) : (
                <div style={{maxWidth: "800px", margin: "0 auto"}}>
                    {/* Profile Information */}
                    <Card
                        title={<Title level={4}>Profile Information</Title>}
                        bordered={true}
                        style={{borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"}}
                    >
                        <div style={{lineHeight: "2", padding: "10px 0"}}>
                            <p style={{fontSize: "16px", margin: "10px 0", color: "#333"}}>
                                <Text strong style={{color: "#1890ff"}}>Name:</Text>
                                <span style={{marginLeft: "8px", color: "#555", fontWeight:"700"}}>{userInfo.name}</span>
                            </p>
                            <p style={{fontSize: "16px", margin: "10px 0", color: "#333", fontWeight:"700"}}>
                                <Text strong style={{color: "#1890ff"}}>Email:</Text>
                                <span style={{marginLeft: "8px", color: "#555", fontWeight:"700"}}>{userInfo.email}</span>
                            </p>
                            <p style={{fontSize: "16px", margin: "10px 0", color: "#333"}}>
                                <Text strong style={{color: "#1890ff"}}>Phone Number:</Text>
                                <span style={{marginLeft: "8px", color: "#555", fontWeight:"700"}}>{userInfo.phoneNumber}</span>
                            </p>
                        </div>
                    </Card>

                    <Card
                        title={<Text style={{ fontSize: "1.5rem", color: "#1890ff" }}>Address</Text>}
                        bordered
                        style={{
                            marginTop: "20px",
                            borderRadius: "8px",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                            background: "#fdfdfd"
                        }}
                        headStyle={{
                            borderBottom: "1px solid #e8e8e8",
                            fontSize: "16px"
                        }}
                    >
                        {address ? (
                            <div style={{ padding: "10px" }}>
                                <p>
                                    <Text strong style={{color: "#1890ff"}}>Street: </Text>
                                    {address.street}
                                </p>
                                <p>
                                    <Text strong style={{color: "#1890ff"}}>City: </Text>
                                    {address.city}
                                </p>
                                <p>
                                    <Text strong style={{color: "#1890ff"}}>State: </Text>
                                    {address.state}
                                </p>
                                <p>
                                    <Text strong style={{color: "#1890ff"}}>Zip Code: </Text>
                                    {address.zipCode}
                                </p>
                                <p>
                                    <Text strong style={{color: "#1890ff"}}>Country: </Text>
                                    {address.country}
                                </p>
                            </div>
                        ) : (
                            <Alert
                                message="No Address information available"
                                type="info"
                                showIcon
                                style={{ margin: "10px 0" }}
                            />
                        )}
                        <Button
                            type="primary"
                            style={{
                                marginTop: "10px",
                                backgroundColor: "#1890ff",
                                borderColor: "#1890ff",
                                borderRadius: "4px"
                            }}
                            onClick={handleAddressClick}
                        >
                            {userInfo.address ? "Edit Address" : "Add Address"}
                        </Button>
                    </Card>


                    <Card title="Order History" bordered={false} style={{marginTop: "20px"}}>
                        <List
                            itemLayout="horizontal"
                            dataSource={paginatedOrders}
                            renderItem={(order) => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar
                                                size={64}
                                                src={`data:image/png;base64,${order.product.imageUrl}`}
                                            />
                                        }
                                        title={<Text strong>{order.product?.name}</Text>}
                                        description={
                                            <div>
                                                <p>
                                                    <Text strong>Status: </Text>
                                                    {order.status}
                                                </p>
                                                <p>
                                                    <Text strong>Quantity: </Text>
                                                    {order.quantity}
                                                </p>
                                                <p>
                                                    <Text strong>Price: </Text>${order.price.toFixed(2)}
                                                </p>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                        <AntPagination
                            current={currentPage}
                            total={orderItemList.length}
                            pageSize={itemsPerPage}
                            onChange={(page) => setCurrentPage(page)}
                            style={{textAlign: "center", marginTop: "20px"}}
                        />
                    </Card>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
