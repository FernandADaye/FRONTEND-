import { useState } from 'react'
import { useDispatch } from 'react-redux'
import crearTarea from '../../features/tareas/tareasSlice'
import React from 'react'

const TareaForm = () => {
    
// crear el state 
const [descipcion, setDescripcion] = useState('')

// dispatch 
const dispatch = useDispatch


// este es para que cuando se haga algun submit no se recage y se rompa la pag
    const onSubmit=(e) =>{
        e.preventDefault()
// aqui se resume que es lo que va a suceder al darle sybmit al boton, esta manda a llamar a una funcion, la que va estaren sevice y en slice que se conecta directo a la bd 
dispatch(crearTarea(descipcion))
// set es el unico que puede manipular la informacion de su par, asi que deespues de darle crear tarea en el boton limpiara el input 
setDescripcion('')
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
                <div className="form-group">
                    <button type='submit' className="btr btn-block">
                        Crear Tarea 
                    </button>
                </div>
            </from>
        </section>
    </>
  )
}

export default TareaForm