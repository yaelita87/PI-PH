import style from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({game })=>{ //traigo las props

    
    return(
        <div className={style.content}>
            <img className={style.img} src={game.background_image} alt="image not found" width="200px" height="250px" />
            <div className={style.titulos}>
            <Link to={`/detail/${game.id}`}>
            <h3 className={style.name}>{game.name}</h3>
            </Link>
            <h5 className={style.h5}>ID# {game.id}</h5>
            <h5 className={style.h5}>
                {
                    game.genres?.map((g)=>(
                        <p className={style.h5}>{g.name}</p>
                    ))
                }
            </h5>
            
            </div> 
        </div>
    )
} //renderizo la carta (GAME) con las props q necesito

export default Card;