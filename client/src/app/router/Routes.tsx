import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import ProductDetails from "../../features/product/ProductDetails";
import Catalog from "../../features/product/Catalog";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Catalog /> },
      { path: "product/:id", element: <ProductDetails /> },
    ],
  },
]);
