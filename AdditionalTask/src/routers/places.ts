import express from "express";
import mysqlDb from "../mysqlDb";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import {PlaceFromFrontend} from "../type";

const placesRouter = express.Router();

placesRouter.get("/", async (req, res, next) => {
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT places.id, places.name FROM places`);
    return res.send(result);
  } catch (e) {
    next(e);
  }
});

placesRouter.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    const [result] = await mysqlDb.getConnection().query(`SELECT *
                                                          FROM places
                                                          WHERE id = ${id}`) as RowDataPacket[];

    const place = result[0];
    if (!place) {
      return res.status(404).send({error: "Not Found!!"});
    }

    return res.send(place);
  } catch (e) {
    next(e);
  }
});

placesRouter.post("/", async (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const postPlaces: PlaceFromFrontend = {
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      "INSERT INTO places (name, description)" +
      "VALUES (?, ?)",
      [postPlaces.name, postPlaces.description],
    ) as ResultSetHeader[];

    return res.send({
      id: result.insertId,
      ...postPlaces,
    });
  } catch (e) {
    next(e);
  }
});

placesRouter.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name) {
    return res.status(400).json({error: "Incorrect data"});
  }
  if (req.body.name.trim() === "") {
    return res.status(404).json({error: "You have sent an empty name"});
  }

  const editPlaces: PlaceFromFrontend = {
    name: req.body.name,
    description: req.body.description.trim() === "" ? null : req.body.description,
  };

  const sql = `UPDATE places SET name = ?, description = ? WHERE id = ${id}`;
  const body = [editPlaces.name, editPlaces.description];
  try {
    const result = await mysqlDb.getConnection().query(sql, body) as RowDataPacket;
    const response = result[0];
    if (response.affectedRows === 0) {
      return res.send({error: "Not Found!!"});
    }

    return res.send({
      id: id,
      ...editPlaces,
    });
  } catch (e) {
    next();
  }
});

placesRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await mysqlDb.getConnection().execute(`DELETE
                                           FROM places
                                           WHERE id = ${id}`);
    return res.send("Ok");
  } catch (e) {
    return res.send({error: "You are breaking your link dependency"});
  }
});

export default placesRouter;