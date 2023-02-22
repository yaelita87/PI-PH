const axios = require('axios');
const {Videogame,Gender} = require("../db");
const {API_KEY} = process.env
const {Op} = require("sequelize")

const getAllApiVideogames = async ()=>{
    let apiVG = [];
    for(let i = 1; i < 6; i++){ //para despues hacer el paginado (me trae unos 20 games x page aprox)
        let allApiVG = await axios.get( //peticion asincrona a la api
            `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}` //rcorre cda page
        );
        apiVG = apiVG.concat(allApiVG.data.results); // conctateno los resultados en mi nueva variable
    }
    newApiVG = apiVG.map((vg)=>{  //mapeo los result y me traigo solo la info que me interesa
        return {
            id: vg.id,
            name: vg.name,
            rating: vg.rating,
            released: vg.released,
            background_image: vg.background_image,
            isDB: "false", //xq la info es de la Api y no de la BD
            genres : vg.genres.map((g)=>{ //mapeo los generos trayendome solo los nombres (tienen mas info en la api)
                return{
                    name: g.name,
                };
            }),
            platforms: vg.platforms.map((p)=>{
              return{
                platforms: p.platform.name
              }
            })
        };
    });
    return newApiVG;
};

const getAllDBVideogames = async()=>{
    return await Videogame.findAll({ //busco los videog de la BD
        attr: ['id','name','rating','background_image','isDB','released'], //atributos de la bd
        include: {
            model: Gender, //incluyo los generos del modelo de generos
            attr:['name'], //solo el nombre
            through: {
                attr: [], //lo incluyo en los atributos
            },
        },
    });
};

const getAllVG= async()=>{
    const allDBVG = await getAllDBVideogames();
    const allApiVG = await getAllApiVideogames(); //concateno ambas informaciones 
    return allDBVG.concat(allApiVG);  //resultados finales  esta es la funct que se exporta p el handler
};

const getApiVgByName = async (name) => {
    const apiSearch = await axios.get(
      `https://api.rawg.io/api/games?search={${name}}&key=${API_KEY}` //busco en la api por nombre
    );
    const vgByName = apiSearch.data.results.map((v) => { //mapeo los resultados de la peticion 
      return {                                       //traigo solo la info de interes 
        id: v.id,
        name: v.name,
        rating:v.rating,
        background_image: v.background_image,
        isDB: "false",
        genres: v.genres.map((g) => {    //mapeo los generos para atrer solo el nombre
          return {
            name: g.name,
          };
        }),
      };
    });
    return vgByName;
  };

  const getDbVgByName = async (name) => {
    let vgByName = await Videogame.findAll({
      attr: ["id", "name", "rating", "background_image", "isDB"], //busco en a BD por nombre
      where: {
        name: {
          [Op.substring]: name,  //uso el operador substring porque me pide que "contenga" ese string(readme)
        },
      },
      include: [
        {
          model: Gender,
          attr: ["name"],  // me pide traer el genero de ese videog entonces lo busco en el modelo de la bd
          through: {
            attr: ["name"],
          },
        },
      ],
    });
    return vgByName;
  };

  const allByName = async (name) => {
      let filtro1 = await getApiVgByName(name);  //concateno los resultados de la bd y la api
      let filtro2 = await getDbVgByName(name);  //esta es la funcion que se exporta p el handler
      return filtro1.concat(filtro2);
  }



// const nanana = async(req,res,next)=>{
//   const name = req.query.name;
//   if(name){
//      try {
//       let vgNames = await allByName(name);
//        let filtered = vgNames.filter((v)=>
//        v.name.toLowerCase().includes(name.toLowerCase())
//        );
//        if(filtered.length >= 16){
//                  let short = filtered.slice(0,15);
//                  return res.status(200).send(short);
//                 } else if(filtered.length <= 15){
//                   res.status(200).send(filtered);
//                 }
                
                
//               } catch (error) {
//        res.status(404).send("Npt found");
       
//      }
// } else {
//   let allVg = await getAllVg();
//         res.status(200).send(allVg);
// }
// }
  //  const filterByName = async (req,res,next) => {
  //    try {
  //      const name = req.query.name;
  //      if(name){
  //        let vgNames = await allByName(name);
  //        let filtered = vgNames.filter((v)=>
  //        v.name.toLowerCase().includes(name.toLowerCase())
  //        );
  //        if(filtered.length >= 16){
  //         let short = filtered.slice(0,15);
  //         return res.status(200).send(short);
  //        } else if(filtered.length <= 15){
  //          res.status(200).send(filtered);
  //        } else{
  //          res.status(404).send("Npt found");
  //        }

  //      }else{
  //        let allVg = await getAllVg();
  //        res.status(200).send(allVg);
  //      }
       
  //    } catch (error) {
  //      next (error); 
  //    }
   
  //     }

     
    
const createVideogame = async (  //armo el modelo del nuevo videojuego
    name, 
    description, 
    release,
    rating,
    gender,
    platforms,
    background_image) => {
   
    const newVg = await Videogame.create ( // el await es "ëspero que esta promesa se resuelva"
      {name, 
      description, 
      release, 
      rating, 
      platforms, 
      background_image});


      let dbGender = await Gender.findAll({
        where: {name: gender}
      })

      newVg.addGender(dbGender)
      return newVg;
    //   const newGen = await Gender.create({name: gender}); //creo el nuevo genero
    //   await newVg.addGender(newGen); // agrego el nuevo genero al nuevo videojuego
    //  return newVg;
    };

    
    


module.exports= {
    getAllVG,
    createVideogame,
    allByName,
    
 

  

}

