import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {CategoryFromFrontend} from "../type";

const categoriesRouter = express.Router();

const dataChecking =
categoriesRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT  categories.id, categories.name FROM categories`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT * FROM categories WHERE id = ${id}`) as RowDataPacket[];

    const category = result[0];
    if (!category) {
      return res.status(404).send({error: "Not Found!!"});
    }

    return res.send(category);
  } catch (e) {
    next(e);
  }
});

categoriesRouter.post("/", async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const postCategories: CategoryFromFrontend = {
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO categories (name, description)' +
      'VALUES (?, ?)',
      [postCategories.name, postCategories.description],
    ) as ResultSetHeader[];

    return res.send({
      id: result.insertId,
      ...postCategories,
    });
  } catch (e) {
    next(e);
  }
});

categoriesRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const editCategory: CategoryFromFrontend = {
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
  };

  const sql = `UPDATE categories SET name = ?, description = ? WHERE id = ${id}`;
  const body = [editCategory.name, editCategory.description];
  try {
    const result = await mysqlDb.getConnection().query(sql, body) as RowDataPacket;
    const response = result[0];
    if (response.affectedRows === 0) {
      return res.send({error: "Not Found!!"});
    }

    return res.send({
      id: id,
      ...editCategory,
    });
  } catch (e) {
    next();
  }
});

categoriesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await mysqlDb.getConnection().execute(`DELETE FROM categories WHERE id = ${id}`);

    return res.send("Ok");
  } catch (e) {
    return res.send({error: "You are breaking your link dependency"});
  }
});

export default categoriesRouter;