import {GET_VIDEOGAMES,
     FILTER_GENDER,
      GET_GAMES_BY_NAME,
       GET_DETAIL,
        POST_VG,
         GET_GENRES,
         ALPHABETICAL,
         CREATE_OR_EXIST,
         RATING
 } from "./actions.js"

const initialState = {
    videogames: [],  //inicio el estado en un array vacio
    gender: [],
    detail:{},
   allVideogames:[],
   filter:[]
    
}


const reducer = (state= initialState, action) =>{
 switch(action.type){
     case GET_VIDEOGAMES:   //armo mis distintos casos 
         return{
             ...state,
             videogames: action.payload, //es el valor q le paso (en este caso es el get al locallhost)
             filter: action.payload,  //copia de los estados anteriores
             allVideogames: action.payload,
            }
    
     case GET_GAMES_BY_NAME:
         return{
             ...state,
             videogames: action.payload
             
         }
    case GET_DETAIL:
        return{
            ...state,
            detail: action.payload
        }

    
    case POST_VG:
       return{
           ...state,
       
    }
    case GET_GENRES:
        return{
            ...state,
            gender: action.payload
        
    }
    case FILTER_GENDER:
    const allgenders = state.allVideogames;
    const vgfiltered = [];
    allgenders.forEach((vg)=> vg.gender.forEach((gender)=>{
        if(gender.name === action.payload){
            vgfiltered.push(vg);
        };
        return {
            ...state, 
            videogames: action.payload === "all" ? allgenders : vgfiltered
        }
    }))
    case CREATE_OR_EXIST:
        const createdFilter = action.payload === 'Created'
        ? state.allVideogames.filter((v)=> v.created)
        : state.allVideogames.filter((v)=> !v.created)

        return {
            ...state,
            videogames: action.payload === "all" ? state.allVideogames : createdFilter,
        
    }
    case ALPHABETICAL:
        let sortArray = action.payload === "asc" ?
        state.videogames.sort(function(a,b){
            if(a.name > b.name){
                return 1; 
            }
            if(b.name < a.name){
              return  -1;
            }
            return 0;
        })
       : state.videogames.sort(function(a,b){
           if(a.name > b.name){
               return -1;
           }
           if(a.name < b.name){
               return 1;
           }
           return 0;
       });
          return {
              ...state,
              videogames: sortArray,
          }  

          case RATING: 
          let sortRat = action.payload === "low" ?
          state.videogames.sort(function(a,b){
              if(a.name > b.name){
                  return 1; 
              }
              if(b.name < a.name){
                return  -1;
              }
              return 0;
          })
         : state.videogames.sort(function(a,b){
             if(a.name > b.name){
                 return -1;
             }
             if(a.name < b.name){
                 return 1;
             }
             return 0;
         });
            return {
                ...state,
                videogames: sortRat,
            }  

  
    default:
         return {...state};
 }
}

export default reducer;