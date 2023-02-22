import style from './CardsContainer.module.css';
import Card from "../Card/Card";
import { useSelector } from 'react-redux';
import React from 'react';


const CardsContainer = ({vgPerPage, page})=>{
    const games = useSelector((state) => state.videogames); //selc estado
  

    //renderizo las props necesarias y la card (GAMe)
    return(
        <div>
        <div className={style.container}>
            {
                games?.slice(
                    //si pag es 1, empieza en 0 y termina en 15
                    //si es 2 empieza en 15 y ter en 30 
                    //la variable PAge es la que va a ir cambando en el componente pagibnadp
                    (page -1)* vgPerPage,
                    (page - 1) * vgPerPage + vgPerPage

                ).map((game)=> (
                    <Card
                    game={game}
                    // name= {game.name}
                    // id= {game.id}
                    // background_image={game.background_image}
                    // genres= {game.genres}
                    />
                ))
            }
        </div>
        </div>
    )
}

export default CardsContainer;