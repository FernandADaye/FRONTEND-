//  este archivo estaran todas las promesas que se necesitan para poder acceder a Backend
import axios from "axios";

//  crear una cosntante con el url de mi api
const API_URL = "https://nervous-dove-vest.cyclic.app/users";

// hacer la peticon al backend para crear un usuario
//  como parametro tendra los datos del usuario
const register = async (userData) => {
  //  La respuesta que dara el Backend
  //  esto ya va de la mando con los metodos que se usan para CRUD, despues del metodo va la direccion a donde se aplicara
  // y como segundo paramatro los datos que se le van a pasar
  const response = await axios.post(API_URL, userData);

  //  mencionarle que va a debolver una respuesta
  return response.data;
};

const login = async (userData) => {
  //  La respuesta que dara el Backend
  //  esto ya va de la mando con los metodos que se usan para CRUD, de
  // y como segundo paramatro los datos que se le van a pasar
  const response = await axios.post(API_URL + "login", userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  //  mencionarle que va a debolver una respuesta
  return response.data;
};
const authService = {
  register,
  login,
};

//  exportarla
export default authService;
