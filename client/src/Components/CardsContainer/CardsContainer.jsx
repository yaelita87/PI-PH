import style from "./CardsContainer.module.css";
import Card from "../Card/Card";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const CardsContainer = ({ vgPerPage, page, allVideg}) => {
  // let games = useSelector((state) => state.videogames); //selc estado

  const [gamesOrder, setGamesOrder] = useState([]);
  const [prueba, setPrueba] = useState([]);

  const handlerAlpha = (e) => {
    // if (e.target.value === "asc") {
    //   const ordenamiento = videoGamesEze.sort(function (a, b) {
    //     if (a.name > b.name) {
    //       return 1;
    //     }
    //     if (b.name > a.name) {
    //       return -1;
    //     }
    //     return 0;
    //   });

    //   setGamesOrder(ordenamiento);
    // } else if (e.target.value === "desc") {
    //   const ordenamiento = videoGamesEze.sort(function (a, b) {
    //     if (a.name < b.name) {
    //       return 1;
    //     }
    //     if (b.name < a.name) {
    //       return -1;
    //     }
    //     return 0;
    //   });

    //   setGamesOrder(ordenamiento);
    // }

    if (e.target.value === "asc") {
      console.log("Puto");
      setPrueba(
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
      setPrueba([])
    }
  };

  //renderizo las props necesarias y la card (GAMe)
  return (
    <div>

      <select onChange={handlerAlpha}>
        <option value="All">Select</option>
        <option value="asc">A to Z</option>
        <option value="desc">Z to A</option>
      </select>

      <div className={style.container}>
        {/* {
                videoGamesEze?.slice(
                   // si pag es 1, empieza en 0 y termina en 15
                   // si es 2 empieza en 15 y ter en 30 
                    //la variable PAge es la que va a ir cambando en el componente pagibnadp
                    (page -1)* vgPerPage,
                    (page - 1) * vgPerPage + vgPerPage

                ).map((game)=> (
                    <Card
                    key={game.name}
                    game={game}
                    name= {game.name}
                    id= {game.id}
                    background_image={game.background_image}
                    genres= {game.genres}
                    />
                ))
            } */}

        {gamesOrder.length > 0 &&
          gamesOrder.slice(
            // si pag es 1, empieza en 0 y termina en 15
            // si es 2 empieza en 15 y ter en 30 
             //la variable PAge es la que va a ir cambando en el componente pagibnadp
             (page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
            <Card
              key={game.name}
              game={game}
              name={game.name}
              id={game.id}
              background_image={game.background_image}
              genres={game.genres}
            />
          ))}

        {prueba.length > 0
          ? prueba.slice(
            // si pag es 1, empieza en 0 y termina en 15
            // si es 2 empieza en 15 y ter en 30 
             //la variable PAge es la que va a ir cambando en el componente pagibnadp
             (page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
              <Card
                key={game.name}
                game={game}
                name={game.name}
                id={game.id}
                background_image={game.background_image}
                genres={game.genres}
              />
            ))
          : allVideg.slice(
            // si pag es 1, empieza en 0 y termina en 15
            // si es 2 empieza en 15 y ter en 30 
             //la variable PAge es la que va a ir cambando en el componente pagibnadp
             (page -1)* vgPerPage,
             (page - 1) * vgPerPage + vgPerPage

         ).map((game) => (
              <Card
                key={game.name}
                game={game}
                name={game.name}
                id={game.id}
                background_image={game.background_image}
                genres={game.genres}
              />
            ))}
      </div>
    </div>
  );
};

export default CardsContainer;