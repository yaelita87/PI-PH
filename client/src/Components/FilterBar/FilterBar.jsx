import { Link } from "react-router-dom";
import style from "./FilterBar.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { filterAlpha, filterByGender,createOrExist, ratingFilter, getGenre } from "../../redux/actions";

const FilterBar = ()=>{

    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3001/genres")
          .then((response) => response.json())
          .then((data) => {
            data.sort((a, b) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            });
            data.unshift("All");
            setFilter(data);
            
          });
        
      }, []);




    // useEffect(()=> {
    //     dispatch(getGenre());
    // },[dispatch]);

    const genres = useSelector((state)=> state.genre);
    const games = useSelector((state)=> state.videogames);

    function handlerFilterGender(e){ //despacho de accion traer geners
       // setPage(1);
      
        dispatch(filterByGender(e.target.value));
    }

    // function handlerFilterCrOEx(e){ //despacho de accion traer existe o creados
    //     //setPage(1);
    //     dispatch(createOrExist(e.target.value));
    // }
    // function handlerAlpha(e){ //despacho de accion traer
    //    //setPage(1);
    //    e.preventDefault();
    //    dispatch(filterAlpha(e.target.value));
    // }

    // function handlerRating(e){ //despacho de accion traer
    //    //setPage(1);
    //    e.preventDefault();
    //    dispatch(ratingFilter(e.target.value));
    // }
    return(
        <div className={style.main}>
            {/* <div>
                <select onChange={(e)=>handlerAlpha(e)}>
                    <option value="">Select</option>
                    <option value="asc">A to Z</option>
                    <option value="desc">Z to A</option>
                </select>
            </div> */}
            <div>
                <select onChange={(e)=>handlerFilterGender(e)}>
                    <option value="">Genres</option>
                    
                   {
                    filter.map((g)=> (
                           <option value={g.name}>
                               {g.name}
                           
                           </option>
                       ))
                   }

                </select>

        

            </div>
            {/* <div>
                <select onChange={(e)=>handlerFilterCrOEx(e)}>
                  <option value="">Select</option>
                  <option value="all">All videogames</option>
                  <option value="Created">Created Videogames</option>
                  <option value="Existent">Existent Videogames</option>
                </select>
            </div>
            <div>
                <select onChange={(e)=> handlerRating(e)}>
                    <option value="">Rating</option>
                    <option value="low">LOW</option>
                    <option value="high">HIGH</option>
                </select>
                </div>*/}
        </div> 
    )
}

export default FilterBar;
