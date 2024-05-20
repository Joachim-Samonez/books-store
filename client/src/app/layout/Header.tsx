import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={{
            color: "inherit",
            textDecoration: "none",
            "&:hover": {
              color: "grey.500",
            },
          }}
        >
          BookStore
        </Typography>
        <IconButton
          component={Link}
          to="/basket"
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent="4" color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
