import express from "express";
import { addUser,  deleteUser,  register, signIn, updateUser} from "./user.controller.js";

export const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/users/signup", register);
userRoutes.post("/users/signin", signIn);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
