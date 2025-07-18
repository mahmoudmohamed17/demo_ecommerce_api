import express from "express";
import { createOrder, getOrderById, getUserOrders } from "./order.controller.js";

export const orderRoutes = express.Router();

orderRoutes.get("/orders", getUserOrders);
orderRoutes.get("/orders", getOrderById);
orderRoutes.post("/orders", createOrder);
