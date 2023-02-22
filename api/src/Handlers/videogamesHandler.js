const {getAllVG, allByName, createVideogame}= require("../Controllers/videogamesControl");
const {Videogame, Gender}= require("../db")

const getVideogamesHandler = async (req, res)=>{ //revisar este handler pasarlo al controler
 
    const name = req.query.name;
    if(name){
       try {
        let vgNames = await allByName(name); //espero que me traiga todos por nombre
         let filtered = vgNames.filter((v)=>
         v.name.toLowerCase().includes(name.toLowerCase()) //filtro y comparo pasando todo a minuscula
         );
         if(filtered.length === 0){ //si es 0 me cachea el error 
         throw new Error('not found')
        }
         else if(filtered.length >= 16){    //si es mayor a 16 
                   let short = filtered.slice(0,15);  //me traigo los prim 15
                   return res.status(200).send(short);
                  } else if(filtered.length <= 15){  //si es menos me trae los que haya
                    res.status(200).send(filtered);
                  }
                  
                } catch (error) {
         res.status(404).send({error: error.message}); //cacheo de error
         
       }
  } else {
    let allVg = await getAllVG();  //si no le pasa nombre me trae todos los juegos 
          res.status(200).send(allVg);
  }
  }
;


    const createVideogamesHandler = async (req, res)=>{
        const {name, description, release,rating,gender,platforms,background_image} = req.body;
        
        const newVg = await createVideogame(name, description, release, rating,gender,platforms,background_image);
        
        res.status(200).send(newVg)
        
        }
module.exports = {getVideogamesHandler, createVideogamesHandler}