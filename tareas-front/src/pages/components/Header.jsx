import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const Header = () => {
    return (
    <>
    <header className='header'>
        <div className="logo">
            <Link to='/'> app tareas </Link>
        </div>
                <ul>
                    <li>
                        <Link to ='/Login'>
                            <FaSignInAlt/> login 
                        </Link>
                    </li>
                <li>
                <Link to ='/register'>
                    <FaUser/> Registar  
                </Link>
                </li>
            </ul>
    </header>
    </>
    )
}

export default Header