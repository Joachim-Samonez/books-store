import {
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { ShoppingCartRounded } from "@mui/icons-material";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardActionArea>
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
      <CardActions sx={{ justifyContent: "space-between" }}>
        <ShoppingCartRounded />
        <Typography variant="h6">₱{product.price}</Typography>
      </CardActions>
    </Card>
  );
}
