import { config } from "dotenv"
config({ path: "./.env" })
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js"

const app = express()

app.use(
    cors({
        // origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        // credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection();
app.use(errorMiddleware);

export default app