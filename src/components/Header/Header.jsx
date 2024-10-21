import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
    return ( 
        <header>
            <Link className="logo" to="/">Geracao Bet Store</Link>
            <Link className="favoritos" to="/favoritos">Favoritos</Link>
        </header>
     );
}