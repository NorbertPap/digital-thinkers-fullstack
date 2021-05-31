import express from "express";
import { router as cocktailRouter } from "./routes/cocktailRouter";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/api/cocktail", cocktailRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
