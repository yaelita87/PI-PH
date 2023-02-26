import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../redux/actions';
import style from "./SearchBar.module.css"


export default function SearchBar(){ 
    const dispatch = useDispatch();
    const [name, setName] = useState(""); //espera un string name

    function handleSearch(e){  //busqueda en el input
        setName(e.target.value); //setea el name recibido p buscar
        
    }

    function handleSubmit(e){  //busca una vez q apreto el input
        e.preventDefault();
        dispatch(getNameGame(name)); //despacha la action de busqeda
        
        setName("");
       
    }
    
    

    return(
        <div className={style.div}>
            <input className={style.input} type="search" value={name} placeholder='Search...' onChange={handleSearch} />
            <button className={style.button} type='button' onClick={handleSubmit}>Search</button>
        </div>
    )
}


  
