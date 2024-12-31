import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";

const AdminCategoryPage = () => {
  const [name, setName] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      messageApi.error("Please enter a category name");
    } else {
      // Handle form submission logic
      messageApi.success("Category added successfully");
    }
  };

  return (
    <div
      className="add-category-page"
      style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}
    >
      {contextHolder}
      <Form onSubmit={handleSubmit} className="category-form">
        <h2>Add Category</h2>
        <Form.Item
          label="Category Name"
          rules={[
            { required: true, message: "Please input the category name!" },
          ]}
        >
          <Input
            type="text"
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminCategoryPage;
