import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";

const EditCategory = ({ initialCategoryData }) => {
  const [name, setName] = useState(initialCategoryData.name || "");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      messageApi.error("Category name is required!");
    } else {
      messageApi.success("Category updated successfully!");
      // Handle form submission logic here
    }
  };

  return (
    <div
      className="edit-category-page"
      style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}
    >
      {contextHolder}
      <Form onSubmit={handleSubmit} layout="vertical" className="category-form">
        <h2>Edit Category</h2>

        {/* Category Name Input */}
        <Form.Item
          label="Category Name"
          rules={[
            { required: true, message: "Please enter the category name!" },
          ]}
        >
          <Input
            placeholder="Category Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditCategory;
