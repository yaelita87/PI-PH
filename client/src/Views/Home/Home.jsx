import CardsContainer from "../../Components/CardsContainer/CardsContainer";
import FilterBar from "../../Components/FilterBar/FilterBar";
import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getVideogames } from "../../redux/actions.js";
import { Paginado } from "../../Components/Paginado/Paginado";
import style from "./Home.module.css";


//armo el home 
const Home = ()=>{
    const dispatch = useDispatch(); //solicito dispatch
    const allVideog = useSelector((state)=> state.videogames); //selecciono el estado

    useEffect(()=> {dispatch(getVideogames())},[dispatch]); //hago la peticion para q se ejecute la action




    //paginado
    const totalVg = allVideog?.length; //total juegos
    const vgPerPage = 15; //cant x pag
    const [page, setPage] = useState(1); //pag actual


    if(allVideog) {

    return (
        <div className={style.container}>
            <div className={style.main}>
               <h1 className={style.titulo}>Videogames</h1>
                <FilterBar/>
        </div>
          <CardsContainer vgPerPage={vgPerPage}  page = {page} allVideg={allVideog}/>


        <Paginado totalVg={totalVg} 
        vgPerPage={vgPerPage} page={page} setPage={setPage}/>

        </div>
    ) } else{ return(<div> ...Loading</div>)}
}

export default Home;




// 