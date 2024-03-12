import axios from "axios";

const API_URL = "https://nervous-dove-vest.cyclic.app/tareas";

// funcion para crear tareas
const crearTarea = async (tareaData, token) => {
  const config = {
    // esta parte replicara lo que hacia postman, en autorizacion aparecia un aparte en la que le llamabamos Bearer y le poniamos el token para que nos dejara crear una tareas
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // la respuesta es qeu hace un poust a donde esta bd meiendo sea lo que sea que tenga tareaData y solo si tiene el token
  // primer parametro es el URL
  // segundo parametro los datos
  // tercer parametro es la configuracion
  const response = await axios.post(API_URL, tareaData, config);

  return response.data;
};
// get tareas
const getTareas = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, tareaData, config);

  return response.data;
};

const tareaService = {
  crearTarea,
  getTareas,
};

export default tareaService;
