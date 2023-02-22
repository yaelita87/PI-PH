const {Router}= require('express');


const videogameRouter = Router();
const {getVideogameHandler} = require('../Handlers/videogameHandler')

videogameRouter.get('/:id', getVideogameHandler);

module.exports = videogameRouter;