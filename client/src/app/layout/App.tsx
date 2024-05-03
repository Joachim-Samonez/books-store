import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { useState, useEffect } from "react";
import { Product } from "../models/product";
import ProductList from "../../features/product/ProductList";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: "#eaeaea",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <ProductList products={products} />
      </ThemeProvider>
    </>
  );
}

export default App;
