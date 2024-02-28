import { useEffect, useState } from "react"
import {FaUser} from 'react-icons/fa'

const register = () => {
  
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

  
  return (
    <>
      <section className="heading">
        <h3> <FaUser/> Registrar usuario </h3>
        <p> crea un usuario </p>
      </section>

      <section className="form"> 
        <form >
          <div className="from-group">
              <input 
              type="text"
              className="form-control"
              id='name'
              value={name}
              placeholder="Ingresa tu nombre"
              onChange={onChange}
              />
          </div>
        </form>
      </section>
    </>
  )
}

export default register