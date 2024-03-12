import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import TareaForm from "../pages/components/TareaForm"
import Spinner from "../pages/components/Spinner"
import { getTareas, reset } from "../features/tareas/tareasSlice"
const Dashboard = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state)=> state.auth)
  const {tareas, isLoading, isError, isSuccess, message  } = useSelector((state)=> state.tarea)

  useEffect(()=>{

    if (isError) {
      console.log(message);
    }



    if(!user){
      navigate('/login')
    }else{
      dispatch(getTareas())
    }

    return () => {
      dispatch(reset())
    }


  }, [user, navigate, isError, message, dispatch])

if (isLoading){
  return <Spinner/>
}

  return (
    <>
    <section className="heading"> 
    {/* aqui ya se esta accediendo al user de bd, y en este caso accede al nombre del usuario, este solo accedera si es que existe un user */}
      <h3> Binvenido {user && user.name}</h3>
      <p>Dashboardde tareas </p>
    </section>
    {/* aqui es donde se comienza  aver el formulario  para crear una tarea */}
    <TareaForm/>
    <section className="content">
      {/* si el numero de tareas es mayor a 0 entonces se van amostrar y si no que mande un mensaje qeu qeu no hay tareas que mostrar  */}
    {
      tareas.length > 0 ?(
        <div className="tareas">
{/* va a recorrer el array de las tareas */}
      {tareas.map((tarea) => (
        <TareaItem key={tarea._id} tarea={tarea} />
      ))}
        </div>
      ):(
        <h3> no hay tarea huevo🙄</h3>
      )} 
    </section>
    </>
    )
}

export default Dashboard