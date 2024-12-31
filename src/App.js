import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute, AdminRoute } from "./service/Guard";
import { CartProvider } from "./components/context/CartContext";
import HomePage from "./components/pages/Home";
import ProductDetailsPage from "./components/pages/ProductDetailsPage";
import CategoryListPage from "./components/pages/CategoryListPage";
import CartPage from "./components/pages/CartPage";
import RegisterPage from "./components/pages/RegisterPage";
import LoginPage from "./components/pages/LoginPage";
import ProfilePage from "./components/pages/ProfilePage";
import CategoryProductsPage from "./components/pages/CategoryProductsPage";
import AdminOrderDetailsPage from "./components/admin/AdminOrderDetailsPage";
import AdminOrdersPage from "./components/admin/AdminOrdersPage";
import EditProductPage from "./components/admin/EditProductPage";
import AddProductPage from "./components/admin/AddProductPage";
import AdminProductPage from "./components/admin/AdminProductPage";
import EditCategory from "./components/admin/EditCategory";
import AddCategory from "./components/admin/AddCategory";
import AdminCategoryPage from "./components/admin/AdminCategoryPage";
import AdminPage from "./components/admin/AdminPage";
import AddressPage from "./components/pages/AddressPage";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/categories" element={<CategoryListPage />} />
          <Route
            path="/category/:categoryId"
            element={<CategoryProductsPage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route
            path="/profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="/add-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />
          <Route
            path="/edit-address"
            element={<ProtectedRoute element={<AddressPage />} />}
          />

          <Route
            path="/admin"
            element={<AdminRoute element={<AdminPage />} />}
          />
          <Route
            path="/admin/categories"
            element={<AdminRoute element={<AdminCategoryPage />} />}
          />
          <Route
            path="/admin/add-category"
            element={<AdminRoute element={<AddCategory />} />}
          />
          <Route
            path="/admin/edit-category/:categoryId"
            element={<AdminRoute element={<EditCategory />} />}
          />
          <Route
            path="/admin/products"
            element={<AdminRoute element={<AdminProductPage />} />}
          />
          <Route
            path="/admin/add-product"
            element={<AdminRoute element={<AddProductPage />} />}
          />
          <Route
            path="/admin/edit-product/:productId"
            element={<AdminRoute element={<EditProductPage />} />}
          />

          <Route
            path="/admin/orders"
            element={<AdminRoute element={<AdminOrdersPage />} />}
          />
          <Route
            path="/admin/order-details/:itemId"
            element={<AdminRoute element={<AdminOrderDetailsPage />} />}
          />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
