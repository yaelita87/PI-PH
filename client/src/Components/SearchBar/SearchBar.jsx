import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { getNameGame } from '../../redux/actions';

export default function SearchBar(){ 
    const dispatch = useDispatch();
    const [name, setName] = useState(""); //espera un string name

    function handleSearch(e){  //busqueda en el input
        e.preventDefault();
        setName(e.target.value); //setea el name recibido p buscar
    }

    function handleSubmit(e){  //busca una vez q apreto el input
        
        e.preventDefault();
        dispatch(getNameGame(name)); //despacha la action de busqeda
    }
    

    return(
        <div>
            <input type="text" placeholder='Search...' onChange={handleSearch} />
            <button type='button' onClick={handleSubmit}>Search</button>
        </div>
    )
}