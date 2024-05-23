import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Footer() {
  return (
    <AppBar
      position="static"
      sx={{ mt: 4, top: "auto", bottom: 0, alignItems: "center" }}
    >
      <Toolbar variant="dense">
        <Typography sx={{ fontWeight: "bold" }}>
          © BookStore 2024. Joachim Samoñez
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
