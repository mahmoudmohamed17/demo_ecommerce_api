import express from "express";
import { deleteUser,  signUp, signIn, updateUser, getUsers, getUser} from "./user.controller.js";
import { checkEmail } from "../../middlewares/checkEmail.js";

export const userRoutes = express.Router();

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id", getUser);
userRoutes.post("/users/signup", checkEmail, signUp);
userRoutes.post("/users/signin", signIn);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);
