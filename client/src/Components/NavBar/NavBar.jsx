import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = ()=>{
    return(
        <div className={style.main}>
            <Link to="/home">Home</Link>
            <Link to="/form">Form</Link>
            <SearchBar />
        </div>
    )
}

export default NavBar;