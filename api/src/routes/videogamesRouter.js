const { Router } = require('express');

const videogamesRouter = Router();
const { getVideogamesHandler, createVideogamesHandler} = require ("../handlers/videogamesHandler")


videogamesRouter.get("/", getVideogamesHandler);

videogamesRouter.get("/:name", getVideogamesHandler)

videogamesRouter.post("/", createVideogamesHandler)


module.exports = videogamesRouter