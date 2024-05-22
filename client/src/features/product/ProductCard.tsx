import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";
import { ShoppingCartRounded } from "@mui/icons-material";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <CardHeader
          title={product.name}
          titleTypographyProps={{
            sx: { fontSize: 18, fontWeight: "bold" },
          }}
          align="center"
        />
        <CardMedia
          sx={{ height: 220, backgroundSize: "contain" }}
          image={product.pictureUrl}
          title={product.name}
        />
      </CardActionArea>
      <Divider />
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size="small"
        >
          <ShoppingCartRounded />
        </LoadingButton>
        <Typography sx={{ marginRight: 1 }} variant="h6" color="blue">
          ₱{product.price.toFixed(2)}
        </Typography>
      </CardActions>
    </Card>
  );
}
