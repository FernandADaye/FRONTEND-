import { useState } from 'react'
import { useDispatch } from 'react-redux'

import React from 'react'

const TareaForm = () => {
    
// crear el state 
const [descipcion, setDescripcion] = useState('')



// este es para que cuando se haga algun submit no se recage y se rompa la pag
    const onSubmit=(e) =>{
        e.preventDefault()
    }
    
return (
    <>
    {/* lo que se debolvera aqui es un formulario en el que se podran crear nuevas tareas  */}
        <section className='from'>
            <from onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="descripcion"> Descripcion </label>
                    {/* al ingresar los datos debe reconocer que tiene que tener datos de la misma bd  */}
                    <input 
                    type="text"
                    name="descipcion"
                    id="descripcion"
                    value={descipcion}
                    // como este capo es muy equeño y el unico se puede escribir directamente aqui
                    onChange={(e)=> setDescripcion(e.target.value)}
                    />
                </div>
                

            </from>
        </section>
    </>
  )
}

export default TareaForm