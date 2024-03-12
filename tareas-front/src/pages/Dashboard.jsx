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
    {/* aqui es donde se comienza  aver el formulario para crear una tarea */}
    <TareaForm/>
    </>
    )
}

export default Dashboard