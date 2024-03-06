import { useEffect, useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import {reset, login } from '../features/auth/authSlice'
import Spinner from '../pages/components/Spinner'



const Login = ()=> {

  const [fromData, setFromData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = fromData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
    if(isSuccess || user ){
      navigate('/')
    }
    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch] )

  const onChange = (e)=>{
    setFromData((prevState) =>({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()
    const userData={
      email,
      password
    }
    dispatch(login(userData))
  }
  if (isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className="heading">
    <h3> <FaSignInAlt/> Ingresa tu Usuario</h3>
    <p> Pon tus credenciales </p>
  </section>
  <section className="form"> 
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <input 
        type="email"
        className="form-control"
        id='email'
        name="email"
        value={email}
        placeholder="Ingresa tu email"
        onChange={onChange}
        />
      </div>
      <div className="form-group">
      <input 
        type="password"
        className="form-control"
        id='password'
        name="password"
        value={password}
        placeholder="Ingresa tu password"
        onChange={onChange}
        />
      </div>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Siguiente
          </button>
        </div>
    </form>
  </section>
    </>
    )
}

export default Login