import React from "react";
import "../../style/footer.css";
import { Layout, Row, Col, Typography, Space } from "antd";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import Title from "antd/es/typography/Title";

const { Text } = Typography;

const Footer = () => {
  return (
    <Layout.Footer
      style={{
        backgroundColor: "#001529",
        color: "white",
        padding: "40px 0px",
      }}
    >
      <Row justify="center" gutter={[16, 16]}>
        {/* Footer Column for Links */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "white" }}>
            Quick Links
          </Title>
          <Space direction="vertical">
            <Link to="/" style={{ color: "white" }}>
              Home
            </Link>
            <Link to="/about" style={{ color: "white" }}>
              About Us
            </Link>
            <Link to="/contact" style={{ color: "white" }}>
              Contact Us
            </Link>
            <Link to="/terms" style={{ color: "white" }}>
              Terms & Conditions
            </Link>
            <Link to="/privacy" style={{ color: "white" }}>
              Privacy Policy
            </Link>
          </Space>
        </Col>

        {/* Footer Column for Social Media */}
        <Col xs={24} sm={12} md={6}>
          <Title level={4} style={{ color: "white" }}>
            Follow Us
          </Title>
          <Space size="large">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined style={{ fontSize: "24px", color: "white" }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined style={{ fontSize: "24px", color: "white" }} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined style={{ fontSize: "24px", color: "white" }} />
            </a>
          </Space>
        </Col>

        {/* Footer Column for Copyright */}
        <Col xs={24} sm={12} md={12}>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Text style={{ color: "white" }}>
              &copy; 2024 Nơi thời trang gặp gỡ đam mê.
            </Text>
          </div>
        </Col>
      </Row>
    </Layout.Footer>
  );
};

export default Footer;
