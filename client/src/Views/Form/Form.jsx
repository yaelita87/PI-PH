import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getGender, postVg } from '../../redux/actions';
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
    const gender = useSelector((state) => state.gender);  //stado del reducer
    
    
    
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
        platforms: ["ps4"],
    });
    
    useEffect(()=>{
        dispatch(getGender()); //despacho la accion para traerme los generos 
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
    const selectHandler = (e)=>{
        const prop = e.target.value   //selecciono entre los distinros generos de videjuegos
        setForm({
            ...form, 
            gender: [...form.gender, prop]
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
        if(Object.keys(error).length === 0){   //si el form no maneja errores 
            dispatch(postVg(form));        // despacho la accion del formulario
            alert("Videogame Created Success");  //alerta de videojuego creado
            setForm({                    //seteo de formulario para que sus valores vuelvan a cero
                name:"",
                description: "",
                release: "",
                rating: 0,
                gender: [],
                background_image: "",
               platforms: [],
            });

        } else {
            alert("Failed");
            return;
        }
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
            <label htmlFor="">Genders:</label>
                <select onChange={(e)=> selectHandler(e)}>
                    {gender.map(g=>(
                        <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
                </select>
                 <ul>
                     
                         {form.gender.map(e => e + ", ")
                         }
                         </ul>               
            </div>
            <div>
                <label htmlFor="">Platforms:</label>
                <select name="Select" id="">
                <option value="v1">Ps3</option>
                <option value="v2">Ps4</option>
                <option value="v3">Ps Vita</option>
                <option value="v4">XBox</option>
                <option value="v5">Xbox 360</option>
                <option value="v6">Nintendo</option>
                <option value="v7">MacOS</option>
                <option value="v8">PC</option>
                <option value="v9">Linux</option>
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