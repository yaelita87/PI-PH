const axios = require("axios");
const { Videogame, Genre } = require("../db");
const { API_KEY } = process.env;

const apiFilter = (item)=> {
    return{
      id: item.id,
      name: item.name,
      rating: item.rating,
      released: item.released,
      background_image: item.background_image,
      isDB: item.isDB,
      //genres: item.genres.map((g)=>g.name).join(', '),
      genres: item.genres.map((g)=> {
        return{
          name: g.name,
        }
      }),
      platforms: item.platforms.map((p)=>p.platform.name)
    }
  }
const getApiVgById = async(id)=>{   //ya fue chequeada perfecta!!!

    const vgApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
    
    //const filtro = vgApi.data.results.map((item)=> apiFilter(item));
    const filtro = apiFilter(vgApi.data);
    return filtro;
    
  }
  
  const getBdById = async(id) => {  
    let gameId = await Videogame.findByPk(id,{
        include:{
            model: Genre,
            attributes: ["name"],
            through: { attributes: []},
          }
          
        })
        
        return gameId; 
      }
      
      
      

module.exports= {
    getApiVgById,
    getBdById
  }
  //busqueda en la api
  //  const gameById = { //no debo agregar un map porq la busqyeda por id me trae un solo objeto.
  //      id: vgApi.data.id,   //solo debo ingresar a la data que necesito
  //      name: vgApi.data.name,
  //      rating: vgApi.data.rating,
  //      released: vgApi.data.released,
  //      background_image: vgApi.data.background_image,
  //      genres: vgApi.data.genres.map((gen)=>{   //es un objeto del cual solo necesito el name
  //          return{
  //              name: gen.name,
  //          }
  //      }),
  //      platforms: vgApi.data.platforms.map((p)=>{
  //          return {
  //              platforms: p.platform.name, // platforms --> platform --> name
  //          }
          
          
           
  //      })
  // }