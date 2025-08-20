// src/components/Carts.jsx
import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Card,
  CardMedia,
  CardContent,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function Carts() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on page load
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (index) => {
    let updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  // Calculate totals
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseInt(item.price.replace("₹", "")),
    0
  );
  const discount = totalPrice * 0.05; // 3% discount
  const finalPrice = totalPrice - discount;

  return (
    <>
      {/* Top Bar with Back Button */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MY CART
          </Typography>
          <IconButton color="inherit" onClick={() => navigate("/")}>
            <ArrowBackIcon sx={{ fontSize: 28 }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Page Layout with Equal Panels */}
      <Box sx={{ display: "flex", height: "calc(100vh - 64px)" }}>
        {/* Left Panel - Cart Items */}
        <Box
          sx={{
            flex: 1,
            borderRight: "1px solid #ddd",
            p: 2,
            overflowY: "auto",
          }}
        >
          {cartItems.length === 0 ? (
            <Typography variant="h6">🛒 Your cart is empty</Typography>
          ) : (
            cartItems.map((item, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 1,
                }}
              >
                <CardMedia
                  component="img"
                  image={item.img}
                  alt={item.name}
                  sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 1 }}
                />
                <CardContent sx={{ flexGrow: 1, p: 1 }}>
                  <Typography variant="subtitle1" noWrap>
                    {item.name}
                  </Typography>
                  <Typography variant="body2">{item.price}</Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </Button>
              </Card>
            ))
          )}
        </Box>

        {/* Right Panel - Order Summary */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Order Summary
          </Typography>
          {cartItems.length > 0 ? (
            <Box sx={{ mt: 2 }}>
              {/* Row - Total Price */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Total Price :</Typography>
                <Typography variant="body1">₹{totalPrice}</Typography>
              </Box>

              {/* Row - Discount */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="body1">Discount (5%) :</Typography>
                <Typography variant="body1" color="success.main">
                  -₹{discount.toFixed(2)}
                </Typography>
              </Box>

              {/* Row - Final Price */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 2,
                  borderTop: "1px solid #ddd",
                  pt: 1,
                }}
              >
                <Typography variant="h6">Final Price -</Typography>
                <Typography variant="h6" color="primary">
                  ₹{finalPrice.toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No items selected.
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
}

export default Carts;
