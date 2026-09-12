import { createBrowserRouter } from "react-router";
import Login from "../auth/login/login";
import Register from "../auth/register/register";
import Products from "../components/products/products";
import Home from "../pages/home";
import ProductDetail from "../components/productDetail";
import Layout from "../components/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "products", element: <Products /> },
      { path: "products/:productId", element: <ProductDetail /> },
      { path: "home", element: <Home /> },
    ],
  },
]);

export default router;
