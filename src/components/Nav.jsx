
import { NavLink } from "react-router-dom";

//Using index.html to create my Nav component
const Nav = () => {
    return (
        <nav className="main-nav">
            <ul>
                <li><NavLink to="dogs">Dogs</NavLink></li>
                <li><NavLink to="cats">Cats</NavLink></li>
                <li><NavLink to="beach">Beach</NavLink></li>
            </ul>
        </nav>
    );
};

export default Nav;
