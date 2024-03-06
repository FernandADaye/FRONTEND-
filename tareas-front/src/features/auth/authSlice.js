// esto de aqui sera para la autenticacion de usuario
// importar de la libreria que descargamos y de ahi sacomos dos metodos
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// obtenemos los datos del Usuario mediante el localStorage (ahi esta le token )
const user = JSON.parse(localStorage.getItem("user"));
// importar register
import authService from "./authService";

// crear un estado inical para nuestra rebanada ( para nuestro Slice ), este es un objeto

const initialState = {
  // operador ternario: si existe user usalo, o si no, ponlo como null
  user: user ? user : null,
  // mal
  isError: false,
  // bien
  isSuccess: false,
  // en espera
  isLoading: false,
  // si sale un error aqui cacha el mensaje
  message: "",
};

// registrar un usuario
// como paramento createAsyncThunk va a tener 1 el prefijo, como se va a poder identificar, el nombre del Slice
//  como paramento 2 va a tener la funcion en si junto con sus datos
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      // 🔰
      return await authService.register(user);
    } catch (error) {
      // cualquierrrrrr tipo de error....
      const menssage = (error.response && error.response.data && error.response.data.message) || error.menssage || error.toString();
      // (thunkAPI es un metodo de redux) esto quiere decir que cualquier ante cualquier error sera devuelto una respuesta de su menssage error
      // ❌
      return thunkAPI.rejectWithValue(menssage);
    }
  }
);

export const login = createAsyncThunk(  "auth/login", async (user, thunkAPI ) => {
  try{
    return await authService.login(user)
  } catch(error){
    
    const menssage =(error.response && error.response.data && error.response.data.message) || error.menssage || error.toString();
    return thunkAPI.rejectWithValue(menssage)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

//  exportar creando un Slice
export const authSlice = createSlice({
  // como se llamara el Slice
  name: "auth",
  // como se inicializa
  initialState,
  // createAsyncThunk acepta como tres tipos de parametros, uno de ellos es Type que genera las siguientes acciones, pending, reject o fulfilled, esta solo es una parte
  reducers: {
    //  reste es una 'accion ' dentro llevara un metodo que es para resetear, cuando se se quiera usar solo se debe mandar a llamar (ES UNA FUNCTION (su parametro es state ) =>{})
    reset: (state) => {
      (state.isError = false),
        (state.isLoading = false),
        (state.isSuccess = false);
      state.message = "";
    },
  },
  // comenzaremos a controlar el siclo de vida de la funcion
  extraReducers: (builder) => {
    // para eso tentra tres estados  pending, reject o fulfilled, aqui es donde en verdad estaran bien definidos
    builder
      // case o casos, estos funcionarn para definir los tres estados
      // en caso de que register este pendiente....
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, accion) => {
        state.isLoading = false;
        state.isSuccess = true;
        // el accion payload es lo que va a debolver el Backend (osea esto 🔰)
        state.user = accion.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        // este es el mensaje que se debe devolver en caso de que haya un error (osea esto ❌)
        state.message = accion.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, accion) => {
        state.isLoading = false;
        state.isSuccess = true;
        // el accion payload es lo que va a debolver el Backend (osea
        state.user = accion.payload;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        // este es el mensaje que se debe devolver en caso de que haya
        state.message = accion.payload;
      });
  },
});

// exportar la accion
export const { reset } = authSlice.actions;
// exportar el Slice
export default authSlice.reducer;

// esta es a estructura basica de un Slice
