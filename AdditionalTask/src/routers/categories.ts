import express from "express";
import mysqlDb from "../mysqlDb";

const categoriesRouter = express.Router();

categoriesRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT categories.id, categories.name FROM categories`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await mysqlDb.getConnection().query(`SELECT * FROM categories WHERE id = ${id}`);
  if ()
});

export default categoriesRouter;