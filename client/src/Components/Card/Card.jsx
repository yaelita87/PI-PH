import style from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({game })=>{ //traigo las props
console.log(game);
    
    return(
        <div className={style.content}>
            <img src={game.background_image} alt="image not found" width="200px" height="250px" />
            <Link to={`/detail/${game.id}`}>

            <h3>{game.name}</h3>
            </Link>
            <h5>{game.id}</h5>
            {/* <h5>
                {
                    genres?.map((g)=>(
                        <p>{g.name}</p>
                    ))
                }
            </h5> */}
            
        </div>
    )
} //renderizo la carta (GAME) con las props q necesito

export default Card;