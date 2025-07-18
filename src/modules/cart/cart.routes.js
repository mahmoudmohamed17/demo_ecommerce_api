import express from "express";
import { addToCart, clearCart, getUserCart, removeFromCart, updateCartItem } from "./cart.controller.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

export const cartRoutes = express.Router();

cartRoutes.get("/cart", getUserCart);

cartRoutes.use(verifyToken);
cartRoutes.post("/cart", addToCart);
cartRoutes.put("/cart", updateCartItem);
cartRoutes.delete("/cart", removeFromCart);
cartRoutes.delete("/cart", clearCart);
