import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../../redux/actions';
import style from './Detail.module.css';
import {useParams, Link} from 'react-router-dom';


const Detail = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
   
    useEffect(()=> {
         dispatch(getDetail(id));
    },[dispatch,id]);
    
    const detail = useSelector((state)=> state.detail);

    return (
        <>
        <div className={style.container}>
            {
                detail ? (
                    <div className={style.main}>
                        <img className={style.img} src={detail.background_image} alt={detail.name} width="200px" height="220px"/>
                        <div className={style.contInfo}>
                        <h2 className={style.h2}>Name: {detail.name}</h2>
                        <h2 className={style.h2}>Id: {detail.id}</h2>
                        <h4 className={style.h4}>Released: {detail.released}</h4>
                        <h4 className={style.h4}>Rating: {detail.rating}</h4>
                        <h4 className={style.h4}>Description: {detail.description}</h4>
                        </div>
                        <div className={style.div2}>
                        <h4 className={style.h4}>Genres: </h4>
                        <ul className={style.ul}>
                            {
                                detail.genres?.map((g)=>(
                                    <li className={style.li}>{g.name}</li>
                                ))
                            }
                        </ul>
                        </div>
                        <div className={style.div2}>
                        <h4 className={style.h4}>Platforms:</h4>
                        <ul className={style.ul}>
                            {
                                detail.platforms?.map((p)=>(
                                    <li className={style.li}>{p}</li>
                                ))
                            }
                        </ul>
                        </div>
                               
                    </div>
                ) : (
                  <div>
                        <h2 className={style.h2}>...loading</h2>
                  </div>
                )}
        <div>
           <Link to={"/home"}>
           <button className={style.button}>Back</button>
           </Link>
        </div>
        </div>
             
        </>
    )
}

export default Detail;