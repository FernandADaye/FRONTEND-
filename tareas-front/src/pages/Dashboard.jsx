import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import TareaForm from "../pages/components/TareaForm"
const Dashboard = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state)=> state.auth)
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }
  }, [user, navigate])
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