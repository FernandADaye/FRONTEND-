import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, reset } from '../../features/auth/authSlice'

const Header = () => {
    const dispatch= useDispatch()
    const navigate= useNavigate

    const {user} = useSelector((state)=> state.auth)

    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
        
    }
    return (
    <>
    <header className='header'>
        <div className="logo">
            <Link to='/'> app tareas </Link>
        </div>
        <ul>
            { user ? (
                <li>
                    <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                    </button>
                </li>
            ) : (
                <>
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
                </>
                )}
            </ul>
    </header>
    </>
    )
}

export default Header