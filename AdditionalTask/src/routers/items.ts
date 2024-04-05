import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {ItemsFromFrontend, PlaceFromFrontend} from "../type";
import {imagesUpload} from "../multer";
import placesRouter from "./places";

const itemsRouter = express.Router();

itemsRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT items.id, items.category_id, items.place_id, items.name FROM items`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

itemsRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT * FROM items WHERE id = ${id}`) as RowDataPacket[];

    const item = result[0];
    if (!item) {
      return res.status(404).send({error: "Not Found!!"});
    }

    return res.send(item);
  } catch (e) {
    next(e);
  }
});

itemsRouter.post("/", imagesUpload.single("image"), async (req, res, next) => {
  if (!req.body.name || !req.body.categoryId || !req.body.placeId) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const postItems: ItemsFromFrontend = {
    categoryId: req.body.categoryId,
    placeId: req.body.placeId,
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
    image: req.file ? req.file.filename : null,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO items (category_id, place_id, name, description, image)' +
      'VALUES (?, ?, ?, ?, ?)',
      [postItems.categoryId, postItems.placeId, postItems.name, postItems.description, postItems.image],
    ) as ResultSetHeader[];

    return res.send({
      id: result.insertId,
      ...postItems,
    });
  } catch (e) {
    next(e);
  }
});

itemsRouter.put("/:id", imagesUpload.single("image"), async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name || !req.body.categoryId || !req.body.placeId) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const editItems: ItemsFromFrontend = {
    categoryId: req.body.categoryId,
    placeId: req.body.placeId,
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
    image: req.file ? req.file.filename : null,
  };

  const sql = `UPDATE items SET category_id = ?, place_id = ?, name = ?, description = ?, image = ?  WHERE id = ${id}`;
  const body = [editItems.categoryId, editItems.placeId, editItems.name, editItems.description, editItems.image];
  try {
    const result = await mysqlDb.getConnection().query(sql, body) as RowDataPacket;
    const response = result[0];
    if (response.affectedRows === 0) {
      return res.send({error: "Not Found!!"});
    }

    return res.send({
      id: id,
      ...editItems,
    });
  } catch (e) {
    next();
  }
});

itemsRouter.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await mysqlDb.getConnection().execute(`DELETE FROM items WHERE id = ${id}`);
    return res.send("Ok");
  } catch (e) {
    next(e);
  }
});

export default itemsRouter;