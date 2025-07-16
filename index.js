import express from "express";
import { dbConnection } from "./db/dbConnection";

const app = express();

dbConnection;

app.use(express.json());

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
