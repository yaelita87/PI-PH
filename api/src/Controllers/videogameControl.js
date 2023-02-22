const axios = require("axios");
const { Videogame, Gender } = require("../db");
const { API_KEY } = process.env;


// GET https://api.rawg.io/api/games/{id}

const getApiVgById = async(id)=>{   //ya fue chequeada perfecta!!!

    const vgApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);//busqueda en la api
     const gameById = { //no debo agregar un map porq la busqyeda por id me trae un solo objeto.
         id: vgApi.data.id,   //solo debo ingresar a la data que necesito
         name: vgApi.data.name,
         rating: vgApi.data.rating,
         released: vgApi.data.released,
         background_image: vgApi.data.background_image,
         genres: vgApi.data.genres.map((gen)=>{   //es un objeto del cual solo necesito el name
             return{
                 name: gen.name,
             }
         }),
         platforms: vgApi.data.platforms.map((p)=>{
             return {
                 platforms: p.platform.name, // platforms --> platform --> name
             }
            
            
             
         })
     }
     return gameById;
}

const getBdById = async(id) => {  
    let gameId = await Videogame.findByPk(id,{
        include: [
            {
                model: Gender,
            }
        ]
        
    })

   return gameId; 
}




module.exports= {
    getApiVgById,
    getBdById
}