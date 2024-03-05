import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {FaUser} from 'react-icons/fa'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify'
import {reset, register} from '../features/auth/authSlice'

const Register = () => {
  
  const [fromData, setFromData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = fromData

  const onChange = (e)=>{
    setFromData((prevState) =>({
      ...prevState, 
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) =>{
    e.preventDefault()
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