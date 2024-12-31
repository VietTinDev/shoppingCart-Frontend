import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { List, Typography, Button, Spin, Alert } from "antd";
import '../../style/categoryListPage.css';

const { Title } = Typography;

const CategoryListPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getAllCategory();
      console.log(response.categoryDtoList);
      setCategories(response.categoryDtoList || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  if (loading) {
    return (
        <div className="loading-spinner">
          <Spin size="large" />
        </div>
    );
  }

  return (
      <div className="category-list">
        {error ? (
            <Alert message="Error" description={error} type="error" showIcon />
        ) : (
            <div>
              <Title level={2}>Categories</Title>
              <List
                  dataSource={categories}
                  renderItem={(category) => (
                      <List.Item>
                        <Button type="link" onClick={() => handleCategoryClick(category.id)}>{category.name}</Button>
                      </List.Item>
                  )}
              />
            </div>
        )}
      </div>
  );
};

export default CategoryListPage;
