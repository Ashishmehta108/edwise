import express from "express";
import dotenv from "dotenv";
dotenv.config();
import router from "./routes/user.routes";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", router);

app.listen(4444, () => {
  console.log(`🚀 Server is running on http://localhost:${4444}`);
});
