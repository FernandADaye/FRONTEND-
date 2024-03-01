import { useEffect, useState } from "react"
import {FaSignInAlt} from 'react-icons/fa'

const login = () => {

  const [fromData, setFromData] = useState({
    email: '',
    password: '',
  })

  const { email, password, } = fromData

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

export default login