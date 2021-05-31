import * as express from "express";
import { getCocktail } from "../controllers/getCocktail";

export const router = express.Router();

router.get("/", async function (req, res) {
  const query = req.query.q;
  try {
    res.json(await getCocktail(query as string | undefined));
  } catch (e) {
    res.status(500).json({
      error: "Couldn't handle request"
    })
  }
});
