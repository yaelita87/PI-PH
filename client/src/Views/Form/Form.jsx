import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getGenre, postVg } from '../../redux/actions';
import style from './Form.module.css';
import { Link, useHistory } from 'react-router-dom';



function validate(form){    //funcion para validar que los espacios obligarios del form esten ok
    let error={};
    if(!form.name.trim()){
        error.name = "Requiere name";

    }
    if(!form.description.trim()){  //TRIM  deshace los espacios. 
        error.description= "Requiere description";
    }
    return error;
}

const Form = ()=>{

    const dispatch = useDispatch();
    const history = useHistory(); //acceso a la instacia del historial (para que vuelva a home)
    const genre = useSelector((state) => state.genre);  //stado del reducer
    
    
    
    const [error, setError]= useState({
        name:"",
        description:""
    }); //estado de errores (funcion validate)
    const [form, setForm] = useState({   //seteo de estado del form 
        name: "",                       //contenido a agregar al form mediante el post 
        description: "",
        release: "",
        rating: 0,
        gender: [],
        background_image: "",
        platforms: [],
    });
    
    useEffect(()=>{
        dispatch(getGenre()); //despacho la accion para traerme los generos 
    },[dispatch]);
   
    const handleInputChange = (e)=>{  //paso el event para que se setee lo q escribe el cliente en el form
        
        setError(
            validate({    //seteo la prop con el value de error en el caso que haya
                ...form,
                [e.target.name]: e.target.value,
            }))
        setForm({
            ...form,
            [e.target.name]: e.target.value, //seteo la prop con el value que le pasan
           
        })
    
        
    }
    
    const selectPlat = (e)=> {
        const prop = e.target.value
         setForm({
             ...form,
             platforms: [...form.platforms, prop]
         })
    }
    
    const selectHandler = (e)=>{
        console.log(e.target);
        const prop = e.target.value   //selecciono entre los distinros generos de videjuegos
        setForm({
            ...form, 
            gender: [...form.gender,prop]
            
            
        });
    }
    const submitHandler = (e)=>{   //manejador del boton de submit para enviar el formulario
        e.preventDefault();
        setError(
            validate({         //con validacion y manejo de error
                ...form, 
                [e.target.name]: e.target.value
            })
        )
        // if(Object.keys(error).length === 0){   //si el form no maneja errores 
            dispatch(postVg(form));        // despacho la accion del formulario
            alert("Videogame Created Success");  //alerta de videojuego creado
            // setForm({                    //seteo de formulario para que sus valores vuelvan a cero
            //     name:"",
            //     description: "",
            //     release: "",
            //     rating: 0,
            //     genre: [],
            //     background_image: "",
            //    platforms: [],
            // });

        // } else {
        //     alert("Failed");
        //     return;
        // }
    }
console.log(form);
    
//esquema del formulario
    return (
        <>
        <div>
            <div>
                <Link to="/home" >
                    <button>Back</button>
                </Link>
            </div>
            <div>
                <h1>Create Your Videogame</h1>
            </div>
            <form action="create" onSubmit={(e)=>submitHandler(e)}>
            <div>
                <label htmlFor="">Name:</label>
                <input type="text"
                required value={form.name}
                onChange={(e)=>{handleInputChange(e)}} 
                name="name"/>
                {error.name && <p>{error.name}</p>}
            </div>
            <div>
                <label htmlFor="">Description:</label>
                <input type="text"
                required value={form.description}
                onChange={(e)=> {handleInputChange(e)}}
                name="description" />
                {error.description  && <p>{error.description}</p>}
            </div>
            <div>
            <label htmlFor="">Release:</label>
                <input type="date"
                required value={form.release}
                onChange={(e)=> {handleInputChange(e)}}
                name="release" />
               
            </div>
            <div>
            <label htmlFor="">Rating:</label>
                <input type="number"
                min="0"
                max="5"
                required value={form.rating}
                onChange={(e)=> {handleInputChange(e)}}
                name="rating" />
               
            </div>
            <div>
            <label htmlFor="">Genres:</label>
                <select onChange={(e)=> selectHandler(e)}>
                    {genre.map(g=>(
                        <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
                </select>
                               
            </div>
            <div>
                <label htmlFor="">Platforms:</label>
                <select name="platforms" id="" onChange={(e)=>selectPlat(e)}>
                <option value="Ps3">Ps3</option>
                <option value="Ps4">Ps4</option>
                <option value="Ps Vita">Ps Vita</option>
                <option value="Xbox">XBox</option>
                <option value="Xbox 360">Xbox 360</option>
                <option value="Nintendo">Nintendo</option>
                <option value="MacOs">MacOS</option>
                <option value="PC">PC</option>
                <option value="Linux">Linux</option>
                </select>
            </div>
           
        
            <div>
                <label htmlFor="">Image:</label>
                <input type="file"
                value={form.background_image}
                onChange={(e)=>handleInputChange(e)}
                name="iamge"
                accept='image/png, image/jpg' />
            </div>
            <div>
                <button type='submit' >
                    Create
                </button>
            </div>
            </form>
        </div>
        </>
    )
}


export default Form;