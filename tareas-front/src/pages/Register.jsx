import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {FaUser} from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import {reset, register} from '../features/auth/authSlice'
import Spinner from '../pages/components/Spinner'


const Register = () => {
  
  const [fromData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = fromData

  // usar los imports, que es para saber por cual pagina navegamos y el dispatch para mandar a llamar a la funcion 

    const navigate = useNavigate()
    const dispatch = useDispatch()
//  desustructurar todos los elementos del estado global 
//  useSelector es una herramienta poderosa para acceder a datos del estado global de Redux 
// y sale state.auth porqeu asi es como se llama el Slice global 
const { user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth)


  const onChange = (e)=>{
    setFromData((prevState) =>({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()

    if( password !== password2){
      // toast es algo que instale solo para lo visual en las alertas 
      toast.error ('La contraseña con es la misma rata')
    } else{
      //  en caso de que se registre de forma adecuda entonces debera pasarle los datos del usuario 
      const userData= {
        //  mas adelante el backen se va a encargar de recibir el passward como texto para despues el hash y ponerle sal
        name, email, password
      }
      //  mandar a llamar a la funcion Dispatch y pasarle los datos del usuario 
      //  dispatch manda a llamar a register de authSlice, a su vez register manda a llamar a ottra funcion que hace coneccion directa con BD
      dispatch(register(userData))
    }
  }
  // useEffect se ejecuta después de cada renderización del componente. que permite interactuar con el ciclo de vida del componente funcional en React, facilitando la realización de efectos secundarios y la gestión de su limpieza.
  useEffect(() => {

    if (isError) {
      toast.error(message)
  }

  if (isSuccess) {
      navigate('/login')
  }

  dispatch(reset())

    // las dependencias se encuentrar en forma de array, en caso de que alguna de estas cosas cambien es cuando useEffect se activara 
  }, [user, isError, isSuccess, message, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h3> <FaUser/> Registrar usuario </h3>
        <p> crea un usuario </p>
      </section>

      <section className="form"> 
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
            type="text"
            className="form-control"
            id='name'
            name="name"
            value={name}
            placeholder="Ingresa tu nombre"
            onChange={onChange}
            />
          </div>
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
            <input 
            type="password"
            className="form-control"
            id='password2'
            name="password2"
            value={password2}
            placeholder="Confirma tu password"
            onChange={onChange}
            />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-block">
                Crear
              </button>
            </div>
        </form>
      </section>
    </>
  )
}

export default Register