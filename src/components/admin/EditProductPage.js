import React, { useState } from "react";
import { Form, Input, Button, Select, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const EditProductPage = ({ initialProductData, categories }) => {
  const [name, setName] = useState(initialProductData.name || "");
  const [description, setDescription] = useState(
    initialProductData.description || ""
  );
  const [price, setPrice] = useState(initialProductData.price || "");
  const [categoryId, setCategoryId] = useState(
    initialProductData.categoryId || ""
  );
  const [imageUrl, setImageUrl] = useState(initialProductData.imageUrl || "");
  const [messageApi, contextHolder] = message.useMessage();

  const handleImageChange = ({ file }) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file.originFileObj);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !price || !categoryId) {
      messageApi.error("Please fill in all fields!");
    } else {
      messageApi.success("Product updated successfully!");
    }
  };

  return (
    <div
      className="edit-product-page"
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
    >
      {contextHolder}
      <Form onSubmit={handleSubmit} className="product-form">
        <h2>Edit Product</h2>

        {/* Image Upload */}
        <Form.Item label="Product Image">
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false} // Prevent automatic upload
            onChange={handleImageChange}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
          {imageUrl && (
            <img
              src={imageUrl}
              alt={name}
              style={{ marginTop: "10px", maxWidth: "100%" }}
            />
          )}
        </Form.Item>

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

export default EditProductPage;
