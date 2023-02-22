const axios = require("axios");
const { Gender } = require("../db");
require('dotenv').config();
const { API_KEY } = process.env;


const getApiGender = async () => {
    let allApiGender = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`) //pet a la api
    let filteredApiGender =await allApiGender.data.results.map((genre) => { //mapeo para traerme solo los nombres
        return{
            name: genre.name
        }
    })
    filteredApiGender.forEach(genre => { //recorro esos result 
      Gender.findOrCreate({ //me fijo si existe en la BD y sino lo creo  OJO CON findOrCreate (uso estrict necesario)
        where:{
          name: genre.name
        }
      })      
    });
   const total = await Gender.findAll(); //me traigo todos los generos de la Bd
   return total; 
}







module.exports ={
    
    getApiGender
}