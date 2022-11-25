import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { config } from "dotenv";
import cors from "cors";
import morgan from 'morgan'
import { createServer } from 'http';


import productRoutes from "./routes/product.routes";

import { AppError } from "./utils/appError";

config();
const app = express();
const server = createServer(app);

app.use(morgan('dev'))
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, "404"))
});

export default server;
