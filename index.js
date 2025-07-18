import express from "express";
import { dbConnection } from "./db/dbConnection.js";
import { userRoutes } from "./src/modules/user/user.routes.js";
import { productRoutes } from "./src/modules/product/product.routes.js";
import { cartRoutes } from "./src/modules/cart/cart.routes.js";

const app = express();

dbConnection;

app.use(express.json());
app.use(userRoutes);
app.use(productRoutes);
app.use(cartRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
