import express from "express";
import { deleteUser,  register, signIn, updateUser, getUsers} from "./user.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

export const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.post("/users/signup", checkEmail, register);
userRoutes.post("/users/signin", signIn);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
