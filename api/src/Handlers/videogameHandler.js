const axios = require('axios');
const {getApiVgById, getBdById} = require("../Controllers/videogameControl")

const getVideogameHandler = async (req,res) => {
    const {id} = req.params;
    try {
        if(isNaN(id)){
            let gameDb = await getBdById(id);
            res.status(200).json(gameDb)
        } else{
            let gameApi = await getApiVgById(id);
            res.status(200).json(gameApi);
        }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    //res.send(`obtiene el detalle particular del juego ${id} /incluye generos`)
};

module.exports= {getVideogameHandler};