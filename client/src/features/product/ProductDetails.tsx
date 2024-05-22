import {
  Divider,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const product = useAppSelector((state) =>
    productSelectors.selectById(state, +id!)
  );
  const { status: productStatus } = useAppSelector((state) => state.catalog);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((item) => item.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (parseInt(event.currentTarget.value) >= 0)
      setQuantity(parseInt(event.currentTarget.value));
  }

  function handleUpdateCart() {
    if (!item || quantity > item?.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBasketItemAsync({
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending")) return <h3>Loading...</h3>;

  if (!product) return <h3>Product not found!</h3>;

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <Typography variant="h4" align="center" fontWeight="bold">
          {product.name}
        </Typography>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h4" fontWeight="bold" color="red">
          ₱{product.price.toFixed(2)}
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="gray">
          {product.quantityInStock} stock available
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <TableContainer sx={{ marginBottom: 2 }}>
          <Table>
            <TableBody>
              <TableRow>{product.description}</TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              onChange={handleInputChange}
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
