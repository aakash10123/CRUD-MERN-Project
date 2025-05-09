import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import route from "./routes/userRoute.js";
import cors from "cors"

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT;
const MONGOURL = process.env.MONGO_DB_URL;

app.use(cors())

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB Connected");
    // Start Server
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((Error) => {
    console.log(Error);
  });


  app.use("/api", route)
