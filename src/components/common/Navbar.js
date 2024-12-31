import React, { useState } from "react";
import { Layout, Menu, Input, Avatar, Button, Modal, Form } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import ApiService from "../../service/ApiService";
import "../../style/navbar.css";

const { Header } = Layout;

const Navbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();
  const isAuthenticated = ApiService.isAuthenticated();

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?search=${searchValue}`);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: "Logout",
      content: "Are you sure you want to logout?",
      onOk: () => {
        ApiService.logout();
        navigate("/login");
      },
    });
  };

  const userMenu = (
      <Menu>
        <Menu.Item key="profile">
          <NavLink to="/profile">My Account</NavLink>
        </Menu.Item>
        {isAdmin && (
            <Menu.Item key="admin">
              <NavLink to="/admin">Admin</NavLink>
            </Menu.Item>
        )}
        <Menu.Item key="logout" onClick={handleLogout} icon={<LogoutOutlined />}>
          Logout
        </Menu.Item>
      </Menu>
  );

  return (
      <Layout>
        <Header className="navbar">
          <div className="navbar-brand">
            <NavLink to="/">
              <img
                  src="https://png.pngtree.com/png-vector/20230120/ourlarge/pngtree-beauty-logo-design-png-image_6568470.png"
                  alt="Brand Logo"
                  className="navbar-logo"
              />
            </NavLink>
          </div>

          <Form onFinish={handleSearchSubmit} className="navbar-search">
            <Form.Item>
              <Input
                  placeholder="Search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                  prefix={<SearchOutlined />}
                  className="search-input"
              />
            </Form.Item>
            <Form.Item>
              <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  className="search-button"
              >
                Search
              </Button>
            </Form.Item>
          </Form>

          <Menu mode="horizontal" className="navbar-menu">
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item key="categories">
              <NavLink to="/categories">Categories</NavLink>
            </Menu.Item>
            <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
              <NavLink to="/cart">Cart</NavLink>
            </Menu.Item>
            {!isAuthenticated && (
                <Menu.Item key="login" icon={<LoginOutlined />}>
                  <NavLink to="/login">Login</NavLink>
                </Menu.Item>
            )}
            {isAuthenticated && (
                <Menu.SubMenu
                    key="user"
                    title={<Avatar icon={<UserOutlined />} />}
                    popupOffset={[0, 5]}
                >
                  {userMenu}
                </Menu.SubMenu>
            )}
          </Menu>
        </Header>
      </Layout>
  );
};

export default Navbar;
