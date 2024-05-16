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
import { ShoppingCartRounded } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { blue } from "@mui/material/colors";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  return (
    <Card>
      <CardActionArea component={Link} to={`/product/${product.id}`}>
        <CardHeader
          title={product.name}
          titleTypographyProps={{
            sx: { fontSize: 16, fontWeight: "bold" },
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
      <CardActions>
        <LoadingButton
          loading={loading}
          onClick={() => handleAddItem(product.id)}
          size="small"
          sx={{ mr: "100px" }}
        >
          <ShoppingCartRounded />
        </LoadingButton>
        <Typography sx={{ color: blue[700] }} variant="h6">
          ₱{product.price}
        </Typography>
      </CardActions>
    </Card>
  );
}
