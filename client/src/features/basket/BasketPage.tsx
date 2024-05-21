import { useEffect, useState } from "react";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { Link } from "react-router-dom";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Typography variant="h3">Loading...</Typography>;

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <Grid container spacing={5} direction="row">
      <Grid item xs={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Subtotal</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {basket.items.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ height: 80, marginRight: 20 }}
                      />
                      <span>{item.name}</span>
                    </Box>
                  </TableCell>
                  <TableCell align="right">₱{item.price}</TableCell>
                  <TableCell align="center">
                    <IconButton>
                      <Remove />
                    </IconButton>
                    {item.quantity}
                    <IconButton>
                      <Add />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">
                    ₱{item.price * item.quantity}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={4}>
        <BasketSummary />
        <Button
          component={Link}
          to="/checkout"
          variant="contained"
          size="large"
          fullWidth
        >
          Proceed to checkout
        </Button>
      </Grid>
    </Grid>
  );
}
