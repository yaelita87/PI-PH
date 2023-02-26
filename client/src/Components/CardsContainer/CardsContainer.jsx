import style from "./CardsContainer.module.css";
import Card from "../Card/Card";

import React, {  useState } from "react";


const CardsContainer = ({ vgPerPage, page, allVideg }) => {
  const [sortOrder, setSortOrder] = useState("All");
  const [filterType, setFilterType] = useState("");
  const [rating, setRating] = useState("");
  
  const handleSort = (e) => {   //orden alfabetico
    setSortOrder(e.target.value);
  };
  
  const handleFilter = (e) => {   //filtrado de BD y Api
    setFilterType(e.target.value);
  };
  
  const handleRating = (e) => { 
    setRating(e.target.value);
  }

  let games = [...allVideg];  //copia del estado 

  if (sortOrder === "asc") {
    games.sort((a, b) => a.name.localeCompare(b.name)); //El localeCompare()método devuelve el orden de clasificación -1, 1 o 0 (para antes, después o igual).
    

  } else if (sortOrder === "desc") {
    games.sort((a, b) => b.name.localeCompare(a.name));
  }
  
  if (filterType === "Created") {
    games = games.filter((game) => isNaN(game.id));
  } else if (filterType === "Existent") {
    games = games.filter((game) => !isNaN(game.id));
  }
  
  if(rating === "low"){
     games = games.sort((a, b) => {
       if(a.rating > b.rating) return 1;
       if(b.rating > a.rating) return -1;
       return 0;
      
      });
    }else if(rating === "high"){
      games = games.sort((a, b) => {
        if(a.rating < b.rating) return 1;
        if(b.rating < a.rating) return -1;
        return 0;
      })
    }
    
    const start = (page - 1) * vgPerPage;  //paginado
    const end = start + vgPerPage;//paginado
    
    return (
      <div>
        <div className={style.padre}>
      <select className={style.select} onChange={handleSort}>
        <option className={style.option} value="All">Alphabetic</option>
        <option className={style.option} value="asc">A to Z</option>
        <option className={style.option} value="desc">Z to A</option>
      </select>
      <select className={style.select} onChange={handleFilter}>
        <option className={style.option} value="">DataBase</option>
        <option className={style.option} value="Created">Created Videogames</option>
        <option className={style.option} value="Existent">Existent Videogames</option>
      </select>
      <select className={style.select} onChange={handleRating}>
       <option className={style.option} value="">Rating</option>
       <option className={style.option} value="low">LOW</option>
       <option className={style.option} value="high">HIGH</option>
     </select>
     </div>
      <div className={style.container}>
        {games.slice(start, end).map((game) => (
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
// const CardsContainer = ({ vgPerPage, page, allVideg}) => {
 

//   const [gamesOrder, setGamesOrder] = useState([]);
//   const [order, setOrder] = useState([]);
//   const [exist, setExist] = useState([]);
  
  
//   const handlerAlpha = (e) => {
//     if (e.target.value === "asc") {
//       console.log("funciona maldita sea");
//       setGamesOrder(
//         allVideg.sort((a, b) => {
//           if (a.name > b.name) return 1;
//           if (b.name > a.name) return -1;
//           return 0;
//         })
//       );
//       setGamesOrder([]);
//     } else if (e.target.value === "desc") {
//       setGamesOrder(
//         allVideg.sort((a, b) => {
//           if (a.name < b.name) return 1;
//           if (b.name < a.name) return -1;
//           return 0;
//         })
//       );
//       setGamesOrder([])
//     }
//   };

//   const handlerRating=(e)=>{ //despacho de accion traer
//     if(e.target.value === "low"){
//         console.log(allVideg)
//       setOrder(
//           allVideg.sort((a,b)=> {
//               if(a.rating >b.rating) return 1;
//               if(b.rating > a.rating) return -1;
//               return 0;
//           })
//       );
//       setOrder([]);
       
//     } else if(e.target.value === "high"){
//         console.log(allVideg);
//         setOrder(
//             allVideg.sort((a,b)=>{
//                 if(a.rating < b.rating) return 1;
//                 if(b.rating < a.rating) return -1;
//                 return 0;
//             })
//             ); setOrder([])
//     }
//     }

//     const handlerFilterCrOEx = (e) => {
//       const filteredVideos = allVideg.filter((video) => {
//         if (e.target.value === 'Created') {
//           return isNaN(video.id);
//         } else if (e.target.value === 'Existent') {
//           return !isNaN(video.id);
//         }
//       });
    
//       setExist(filteredVideos);
//       console.log(filteredVideos);
//     }
    

//   // const handlerFilterCrOEx = (e) => {
//   //       const filteredVideos = allVideg.map((video) => {
//   //         if(e.target.value === 'Created'){
//   //           if(isNaN(video.id)){
//   //             setExist(filteredVideos)
//   //             console.log(filteredVideos);
//   //           }
//   //         } else if(e.target.value === 'Existent'){
//   //           if(video.id === 'number'){
//   //             setExist(filteredVideos)
//   //           }
//   //         }})
//   //         setExist([])
      
//   //     }

//   //renderizo las props necesarias y la card (GAMe)
//   return (
//     <div>

//       <select onChange={handlerAlpha}>
//         <option value="All">Alphabetic</option>
//         <option value="asc">A to Z</option>
//         <option value="desc">Z to A</option>
//       </select>
//       <div>
//         <div>
//       <select onChange={handlerRating}>
//                     <option value="">Rating</option>
//                     <option value="low">LOW</option>
//                     <option value="high">HIGH</option>
//                 </select>
//         </div>
//                 <div>
//                 <select onChange={handlerFilterCrOEx}>
//                   <option value="">DataBase</option>
//                   <option value="Created">Created Videogames</option>
//                   <option value="Existent">Existent Videogames</option>
//                 </select>
//         </div>
                
//       </div>

//       <div className={style.container}>
      
//       {exist.length> 0 &&
//           exist.slice(
//             // si pag es 1, empieza en 0 y termina en 15
//             // si es 2 empieza en 15 y ter en 30 
//              //la variable PAge es la que va a ir cambando en el componente pagibnadp
//              (page -1)* vgPerPage,
//              (page - 1) * vgPerPage + vgPerPage

//          ).map((game) => (
//             <Card
//               key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
//               genres={game.genres}
//             />
//           ))} 
      
//       {order.length > 0 &&
//           order.slice(
//              (page -1)* vgPerPage,
//              (page - 1) * vgPerPage + vgPerPage

//          ).map((game) => (
//             <Card
//               key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
//               genres={game.genres}
//             />
//           ))}


//         {gamesOrder.length > 0
//           ? gamesOrder.slice((page -1)* vgPerPage,
//              (page - 1) * vgPerPage + vgPerPage

//          ).map((game) => (
//               <Card
//                 key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
//                 genres={game.genres}
//               />
//             ))
//           : allVideg.slice((page -1)* vgPerPage,
//              (page - 1) * vgPerPage + vgPerPage

//          ).map((game) => (
//               <Card
//                 key={game.name} game={game} name={game.name} id={game.id} background_image={game.background_image}
//                 genres={game.genres}
//               />
//             ))}
           
//       </div>
//     </div>
//   );
// };