import { Link } from "react-router-dom";
import styleNavBar from './styles/navbar.module.css'
import logo from '../image/pngwing.png'
const NavBar = () => {

    return ( 
        <nav className={styleNavBar.nav}>

            <Link   to={`/home`} >
                    <div className={styleNavBar.logo}>
                        <img src={logo} width="100px" height="60px" alt=''></img>
                    </div> 
            </Link>
        </nav>
     );
}
 
export default NavBar;