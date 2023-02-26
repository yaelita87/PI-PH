import React from "react";

import style from "./Paginado.module.css";

export const Paginado = ({totalVg, vgPerPage, page, setPage})=>{
  
    const numPage = []; //numero de paginas
    //recorro en busca de la cant de paginas
    for(let i=1; i<= Math.ceil(totalVg/vgPerPage); i++){
        //mathceil redondea p arriba la div entre el total de vg y la cant permitida de vg x pagina
        numPage.push(i); //pushea ese num de pag al array
    }

    //botones adicionales de anterior y siguiente 

    const previus = ()=> {
        setPage(page - 1); //set page del estado ahora es page -1
    }

    const next = ()=>{
        setPage(page + 1); //idem +1
    }

    const onChange = (e)=>{//seteo el evento p cambiar de pagina
      setPage(Number(e.target.value)); //Number evento valor al q se cambia
    };

    // Validamos si hay páginas previas o siguientes para mostrar los botones
    const hasPrevious = page > 1;
    const hasNext = page < numPage.length;

    //acomodo por orden los btpnes
    //mapeo el num paginas para buscar cuantas hay y traerlas
    return (
        <div className={style.div}>
            {hasPrevious && (
                <button className={style.anterior} onClick={previus}>
                    Previus
                </button>
            )}
            {
                numPage.map((n)=>(
                    <button className={style.nPagina} onClick={onChange} value={n}>
                        {n}
                    </button>
                ))
            }
            {hasNext && (
                <button className={style.anterior} onClick={next}>
                    Next
                </button>
            )}
        </div>
    );
};
