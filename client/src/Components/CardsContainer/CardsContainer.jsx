import style from "./CardsContainer.module.css";
import Card from "../Card/Card";

import React, {  useState } from "react";

const CardsContainer = ({ vgPerPage, page, allVideg}) => {
 

  const [gamesOrder, setGamesOrder] = useState([]);
  const [order, setOrder] = useState([]);
  
  
  const handlerAlpha = (e) => {
    if (e.target.value === "asc") {
      console.log("funciona maldita sea");
      setGamesOrder(
        allVideg.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (b.name > a.name) return -1;
          return 0;
        })
      );
      setGamesOrder([]);
    } else if (e.target.value === "desc") {
      setGamesOrder(
        allVideg.sort((a, b) => {
          if (a.name < b.name) return 1;
          if (b.name < a.name) return -1;
          return 0;
        })
      );
      setGamesOrder([])
    }
  };

  const handlerRating=(e)=>{ //despacho de accion traer
    if(e.target.value === "low"){
        console.log(allVideg)
      setOrder(
          allVideg.sort((a,b)=> {
              if(a.rating >b.rating) return 1;
              if(b.rating > a.rating) return -1;
              return 0;
          })
      );
      setOrder([]);
       
    } else if(e.target.value === "high"){
        console.log(allVideg);
        setOrder(
            allVideg.sort((a,b)=>{
                if(a.rating < b.rating) return 1;
                if(b.rating < a.rating) return -1;
                return 0;
            })
            ); setOrder([])
    }
    }

  //renderizo las props necesarias y la card (GAMe)
  return (
    <div>

      <select onChange={handlerAlpha}>
        <option value="All">Select</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>
      <div>
      <select onChange={(e)=> handlerRating(e)}>
                    <option value="">Rating</option>
                    <option value="low">LOW</option>
                    <option value="high">HIGH</option>
                </select>
                
      </div>

      <div className={style.container}>
      
      {order.length > 0 &&
          order.slice(
            // si pag es 1, empieza en 0 y termina en 15
            // si es 2 empieza en 15 y ter en 30 
             //la variable PAge es la que va a ir cambando en el componente pagibnadp
             (page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
            <Card
              key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
              genres={game.genres}
            />
          ))}


        {gamesOrder.length > 0
          ? gamesOrder.slice((page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
              <Card
                key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
                genres={game.genres}
              />
            ))
          : allVideg.slice((page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
              <Card
                key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
                genres={game.genres}
              />
            ))}
           
      </div>
    </div>
  );
};

export default CardsContainer;