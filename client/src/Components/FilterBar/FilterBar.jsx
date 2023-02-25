import style from "./FilterBar.module.css";
import React, {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {filterByGender} from "../../redux/actions";

const FilterBar = ({allVideg})=>{

    const dispatch = useDispatch();
    const [filter, setFilter] = useState([]);
    //const [exist, setExist] = useState([]);
    
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
      
      function handlerFilterGender(e){ //despacho de accion traer geners
        dispatch(filterByGender(e.target.value));
    }
    
    // const handlerFilterCrOEx = (e) => {
    //     const filteredVideos = allVideg.filter((video) => {
    //       return e.target.value === 'Created' ? video.hasOwnProperty('isDB') : !video.hasOwnProperty('isDB');
    //     });
    //   console.log(filteredVideos);
    //     setExist(filteredVideos);
    //   }
      
     // case CREATE_OR_EXIST:
    //     const createdFilter = action.payload === 'Created'
    //     ? state.allVideogames.filter((v)=> v.created)
    //     : state.allVideogames.filter((v)=> !v.created)
    
    return(
        <div className={style.main}>
            
            <div>
                <select onChange={(e)=>handlerFilterGender(e)}>
                    <option value="all">Genres</option>
                    
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
                  <option value="">DataBase</option>
                  <option value="Created">Created Videogames</option>
                  <option value="Existent">Existent Videogames</option>
                </select>
            </div> */}
            
        </div> 
    )
}


export default FilterBar;





// const handlerRating=(e)=>{ //despacho de accion traer
// //    //setPage(1);
// //    e.preventDefault();
// //    dispatch(ratingFilter(e.target.value));
// if(e.target.value === "low"){
    //     console.log(allVideg)
    //   setOrder(
        //       allVideg.sort((a,b)=> {
//           if(a.rating >b.rating) return 1;
//           if(b.rating > a.rating) return -1;
//           return 0;
//       })
//   );

// } else if(e.target.value === "high"){
    //     console.log(allVideg);
    //     setOrder(
        //         allVideg.sort((a,b)=>{
            //             if(a.rating < b.rating) return 1;
            //             if(b.rating < a.rating) return -1;
            //             return 0;
            //         }))
            // }
            // }
            
            
               
                // useEffect(()=> {
                //     dispatch(getVideogames());
                // },[dispatch]);
            
                
            
                //const filt = useSelector((state)=> state.filter);
                //const games = useSelector((state)=> state.videogames);