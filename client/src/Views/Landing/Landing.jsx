import React from 'react';
import {Link} from "react-router-dom";
import style from "./Landing.module.css";


//pag ppal solo necesita un boton p ir al home y un titulo y una imagen
const Landing = ()=>{
    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                <h1 className={style.lanh1}>Welcome to Videogames</h1>
                <h2 className={style.lanh2}>By Pamela Herrera</h2>
                <Link to="/home">
                    <button className={style.boton}>Enter</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;