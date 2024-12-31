import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Select, Upload } from "antd";
import React, { useState } from "react";

const AddProductPage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const handleImage = (info) => {
    setImage(info.file.originFileObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !categoryId) {
      messageApi.error("Please fill in all fields!");
    } else {
      messageApi.success("Product added successfully!");
      // Handle form submission logic here
    }
  };

  return (
    <div
      className="add-product-page"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      {contextHolder}
      <Form onSubmit={handleSubmit} className="product-form">
        <h2>Add Product</h2>

        {/* Category Selection */}
        <Form.Item
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select
            value={categoryId}
            onChange={(value) => setCategoryId(value)}
            placeholder="Select Category"
          >
            <Select.Option value="">Select Category</Select.Option>
            {categories.map((cat) => (
              <Select.Option value={cat.id} key={cat.id}>
                {cat.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Product Name */}
        <Form.Item
          label="Product Name"
          rules={[
            { required: true, message: "Please input the product name!" },
          ]}
        >
          <Input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price"
          rules={[{ required: true, message: "Please input the price!" }]}
        >
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Product Image"
          rules={[
            { required: true, message: "Please upload a product image!" },
          ]}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleImage}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
