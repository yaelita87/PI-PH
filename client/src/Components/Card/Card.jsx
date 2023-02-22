import style from "./Card.module.css";
import React from "react";
import { Link } from "react-router-dom";

const Card = ({name, id, background_image, genres })=>{ //traigo las props

    console.log(genres);
    return(
        <div className={style.content}>
            <img src={background_image} alt="image not found" width="200px" height="250px" />
            <Link to={`/detail/${id}`}>

            <h3>{name}</h3>
            </Link>
            <h5>{id}</h5>
            <h5>
                {
                    genres.map((g)=>(
                        <p>{g.name}</p>
                    ))
                }
            </h5>
            
        </div>
    )
} //renderizo la carta (GAME) con las props q necesito

export default Card;