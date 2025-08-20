import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function MiniShop() {
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(cart.length);
  }, []);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(product);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    setCartCount(cart.length); 
  };

  const products = [
    { id: 1, img: "/minishop-imgs/62urk_512.avif", name: "Black Shoe", price: "₹500" },
    { id: 2, img: "/minishop-imgs/mofzv_512.avif", name: "iPhone 13 case", price: "₹200" },
    { id: 3, img: "/minishop-imgs/wt2pk_512.avif", name: "Hoodie", price: "₹999" },
    { id: 4, img: "/minishop-imgs/8wmgf_512.avif", name: "Cricket Kit", price: "₹4550" },
    { id: 5, img: "/minishop-imgs/s0b1t_512.avif", name: "White Shoe", price: "₹500" },
    { id: 6, img: "/minishop-imgs/atkzm_512.avif", name: "Cricket Ball", price: "₹200" },
    { id: 7, img: "/minishop-imgs/bw7ep_512.avif", name: "Diary", price: "₹400" },
    { id: 8, img: "/minishop-imgs/f69pd_512.avif", name: "Water Bottle", price: "₹250" },
    { id: 9, img: "/minishop-imgs/fqyea_512.avif", name: "Game Board", price: "₹999" },
    { id: 10, img: "/minishop-imgs/fbs8b_512.avif", name: "Casual Shoe", price: "₹500" },
  ];

  const uniqueProducts = products.filter(
    (prod, index, self) => index === self.findIndex((p) => p.id === prod.id)
  );

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "left" }}>
            MINI SHOP
          </Typography>

          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartCount} color="error">
              <ShoppingCartIcon sx={{ fontSize: 30 }} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} sx={{ p: 3 }} justifyContent="center">
        {uniqueProducts.map((product) => (
          <Grid item xs={3} key={product.id}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia component="img" height="250" image={product.img} alt={product.name} />

              <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {product.name}
                </Typography>
              </CardContent>

              <CardActions>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" color="text.primary">
                    {product.price}
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  startIcon={<ShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                >
                  Add
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MiniShop;
