import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { getVideogames } from "../../redux/actions";

const NavBar = ()=>{
    const dispatch= useDispatch();

    const reset =()=>{
        dispatch(getVideogames())
    }
    return(
        <div className={style.main}>
            <Link className={style.link} onClick={reset} to="/home">Home</Link>
            <Link className={style.link} to="/form">Form</Link>
            <SearchBar />
        </div>
    )
}

export default NavBar;