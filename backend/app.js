import { config } from "dotenv"
config({ path: "./.env" })
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js"
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import metaRouter from "./routes/metaRouter.js";

// import { newsLetterCron } from "./automation/newsLetterCron.js";
const app = express()

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

app.use("/api/v1/user", userRouter)
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);
app.use("/api/v1/meta", metaRouter);


// newsLetterCron()
connection();
app.use(errorMiddleware);

export default app