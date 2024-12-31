import axios from "axios";

export default class ApiService {
  static BASE_URL = "http://localhost:8080";

  static getHeader() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  /**AUTH && USERS API */
  static async registerUser(registration) {
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      registration
    );
    return response.data;
  }

  static async loginUser(userLogin) {
    const response = await axios.post(`${this.BASE_URL}/auth/login`, userLogin);
    return response.data;
  }

  static async getLoggedInUserInfo() {
    const response = await axios.get(`${this.BASE_URL}/user/my-info`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  /**PRODUCT ENDPOINT */
  static async addProduct(product) {
    const response = await axios.post(
      `${this.BASE_URL}/product/create`,
      product,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async updateProduct(product) {
    const response = await axios.put(
      `${this.BASE_URL}/product/update`,
      product,
      {
        headers: {
          ...this.getHeader(),
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  static async getAllProducts() {
    const response = await axios.get(`${this.BASE_URL}/product/get-all`);
    return response.data;
  }

  static async searchProducts(searchValue) {
    const response = await axios.get(`${this.BASE_URL}/product/search`, {
      params: { searchValue },
    });
    return response.data;
  }

  static async getAllProductsByCategoryId(categoryId) {
    const response = await axios.get(
      `${this.BASE_URL}/product/get-by-category-id/${categoryId}`
    );
    return response.data;
  }

  static async getProductById(productId) {
    const response = await axios.get(`${this.BASE_URL}/product/${productId}`);
    return response.data;
  }

  static async deleteProduct(productId) {
    const response = await axios.delete(
      `${this.BASE_URL}/product/${productId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**CATEGORY */
  static async createCategory(category) {
    const response = await axios.post(
      `${this.BASE_URL}/category/create`,
      category,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async getAllCategory() {
    const response = await axios.get(`${this.BASE_URL}/category/get-all`);
    return response.data;
  }

  static async getCategoryById(categoryId) {
    const response = await axios.get(`${this.BASE_URL}/category/${categoryId}`);
    return response.data;
  }

  static async updateCategory(categoryId, category) {
    const response = await axios.put(
      `${this.BASE_URL}/category/update/${categoryId}`,
      category,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  static async deleteCategory(categoryId) {
    const response = await axios.delete(
      `${this.BASE_URL}/category/${categoryId}`,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /**ORDEDR */
  static async createOrder(order) {
    const response = await axios.post(`${this.BASE_URL}/order/create`, order, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getAllOrders() {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
    });
    return response.data;
  }

  static async getOrderItemById(itemId) {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
      params: { itemId },
    });
    return response.data;
  }

  static async getAllOrderItemsByStatus(status) {
    const response = await axios.get(`${this.BASE_URL}/order/filter`, {
      headers: this.getHeader(),
      params: { status },
    });
    return response.data;
  }

  static async updateOrderitemStatus(orderItemId, status) {
    const response = await axios.put(
      `${this.BASE_URL}/order/update-item-status/${orderItemId}`,
      {},
      {
        headers: this.getHeader(),
        params: { status },
      }
    );
    return response.data;
  }

  /**ADDRESS */
  static async saveAddress(address) {
    const response = await axios.post(
      `${this.BASE_URL}/address/save`,
      address,
      {
        headers: this.getHeader(),
      }
    );
    return response.data;
  }

  /** AUTHEMNTICATION CHECKER */
  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  }

  static isAuthenticated() {
    const token = localStorage.getItem("token");
    return !!token;
  }

  static isAdmin() {
    const role = localStorage.getItem("role");
    return role === "ADMIN";
  }

  static isUser() {
    const role = localStorage.getItem("role");
    return role === "USER";
  }
}
