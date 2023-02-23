import axios from 'axios';

export const GET_VIDEOGAMES = 'GET_VIDEOGAMES'; //armo y ex constantes
export const GET_GAMES_BY_NAME = 'GET_GAMES_BY_NAME';
export const GET_GENRES= 'GET_GENRES';
export const GET_DETAIL= 'GET_DETAIL';
export const FILTER_GENDER = 'FILTER_GENDER';
export const POST_VG = 'POST_VG';
export const CREATE_OR_EXIST = 'CREATE_OR_EXIST';
export const ALPHABETICAL = 'ALPHABETICAL';
export const RATING = 'RATING';




export function getVideogames(){
    return async function(dispatch) { 
        const json = await axios.get("http://localhost:3001/videogames");//hago la peticion al back
        
        
        return dispatch({ //armo la action 
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
};

export function getNameGame(name) { //recibo el nombre como parametro
    return async function (dispatch) {//armo la fun asincrona
      try {  //hago try catch porque si no lo encuentra necesito que maneje un error
        const json = await axios.get(
          "http://localhost:3001/videogames?name=" + name   //hago la pet al back name llega por parametro
        );
  
        return dispatch({        //despachp la pet
          type: "GET_GAMES_BY_NAME",
          payload: json.data, //esta es la respuesta 
        });
      } catch (err) {    //si no encuentra el juego me retorna el error 
        alert("Game not found")

        }
      }};

export function getGenre(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/genres');
        return dispatch({
            type: 'GET_GENRES',
            payload: json.data
        })
    }
}

export function postVg(payload){
  return async function(dispatch){
        const resp = await axios.post('http://localhost:3001/videogames',payload);
        return resp;
   }
}

export function getDetail(id){  
  return async function(dispatch){
      const resp = await axios.get(`http://localhost:3001/videogame/${id}`);
      const detail = resp.data;
      dispatch({
          type: GET_DETAIL,
          payload: detail
      })
  }
}

export function filterByGender(payload){
  return{
    type : 'FILTER_GENDER',
    payload,
  }
}

export function createOrExist(payload){
  return{
    type: 'CREATE_OR_EXIST',
    payload
  }
}
  
export function filterAlpha(payload){
  console.log(payload);
  return{
    type: 'ALPHABETICAL',
    payload,
  }
}

export function ratingFilter(payload){
  return{
    type: 'RATING',
    payload,
  }
}
