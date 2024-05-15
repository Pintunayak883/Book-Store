import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Connection } from "./db/db.js";
//import DefaultData from "./DefaultData.js";
import router from "./routes/routes.js";
import UserRouter from "./routes/userRoutes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const URI = process.env.URI;

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// // Db
Connection(URI);

// routes
app.use("/", router);
app.use("/", UserRouter);

app.listen(PORT, () => {
  console.log(`Server Listing at http://localhost/:${PORT}`);
});

// DefaultData();
