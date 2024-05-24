import { Outlet } from "react-router-dom";
import Header from "./Header";
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getCookie } from "../util/util";
import agent from "../api/agent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";
import Footer from "./Footer";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie("buyerId");
    if (buyerId) {
      agent.Basket.get()
        .then((basket) => dispatch(setBasket(basket)))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const theme = createTheme({
    palette: {
      background: {
        default: "#eaeaea",
      },
    },
  });

  if (loading) return "Loading...";

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container
          sx={{
            display: "flex",
            minHeight: "70.2vh",
          }}
        >
          <Outlet />
        </Container>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
