import * as express from "express";
import { getCocktail } from "../controllers/getCocktail";

export const router = express.Router();

router.get("/", async function (req, res) {
  const query = req.query.q;
  res.json(await getCocktail(query as string | undefined));
});
