import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../redux/actions';
import style from './Detail.module.css';
import {useParams, Link} from 'react-router-dom';


const Detail = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
    console.log(id);
    useEffect(()=> {
         dispatch(getDetail(id));
    },[dispatch,id]);
    
    const detail = useSelector((state)=> state.detail);

    return (
        <>
        <div>
            {
                detail ? (
                    <div>
                        <img src={detail.background_image} alt={detail.name} width="200px" height="220px"/>
                        <h2>Name: {detail.name}</h2>
                        <h2>Id: {detail.id}</h2>
                        <h4>Released: {detail.released}</h4>
                        <h4>Rating: {detail.rating}</h4>
                        <h4>{detail.description}</h4>
                        <h4>Genres: </h4>
                        <ul>
                            {
                                detail.genres?.map((g)=>(
                                    <li>{g.name}</li>
                                ))
                            }
                        </ul>
                        <h4>Platforms:</h4>
                        <ul>
                            {
                                detail.platforms?.map((p)=>(
                                    <li>{p.platforms}</li>
                                ))
                            }
                        </ul>
                        
                               
                    </div>
                ) : (
                  <div>
                        <h2>...loading</h2>
                  </div>
                )}
        <div>
           <Link to={"/home"}>
           <button>Back</button>
           </Link>
        </div>
        </div>
             
        </>
    )
}

export default Detail;