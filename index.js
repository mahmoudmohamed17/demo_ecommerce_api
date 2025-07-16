import express from "express";
import { dbConnection } from "./db/dbConnection";
import { userRoutes } from "./src/modules/user/user.routes";

const app = express();

dbConnection;

app.use(express.json());
app.use(userRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
