import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tareaService from "./tareasServices";
const initialState = {
  tareas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//  crear una tarea
export const crearTarea = createAsyncThunk(
  "tareas/crear",
  async (tareaData, thunkAPI) => {
    try {
      // tambien recuerda que paa ingresar una tarea debes estar logeado, osea que tengas el token, asi que le bedemos pasar que es un token y que lo reconozca
      const token = thunkAPI.getState().auth.user.token;
      // cuando todo este bien nos retornara la funcion de services (tambien usa el token que sacamos)
      return await tareaService.crearTarea(tareaData, token);
    } catch (error) {
      const menssage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.menssage ||
        error.toString();
      return thunkAPI.rejectWithValue(menssage);
    }
  }
);

// borrar

export const deleteTarea = createAsyncThunk(
  "tareas/borrar",
  async (tareaData, thunkAPI) => {
    try {
      // tambien recuerda que paa ingresar una tarea debes estar logeado, osea que tengas el toke
      const token = thunkAPI.getState().auth.user.token;
      // cuando todo este bien nos retornara la funcion de services (tambien usa el token que sac
      return await tareaService.deleteTarea(tareaData, token);
    } catch (error) {
      const menssage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.menssage ||
        error.toString();
      return thunkAPI.rejectWithValue(menssage);
    }
  }
);

// obtener las tareas del usuario (get tareas)
// los parametos son 0 y para que el callBack (thunkAPI) no lo interprete como parametro solo pondre un guion bajo
export const getTareas = createAsyncThunk("tareas/get", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await tareaService.getTareas(token);
  } catch (error) {
    const menssage =
      (error.response && error.response.data && error.response.data.message) ||
      error.menssage ||
      error.toString();
    return thunkAPI.rejectWithValue(menssage);
  }
});

export const tareaSlice = createSlice({
  name: "tarea",
  initialState,
  reducer: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // este es en caso de que este pendiente
      .addCase(crearTarea.pending, (state) => {
        state.isLoading = true;
      })
      // en caso de que sea bien recibido
      .addCase(crearTarea.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        // como es array se usa el push
        // accion payloar es lo que va a recibir lo que devuelva como respuesta
        state.tareas.push(actions.payload);
      })
      // esto es cuando no salio bien
      .addCase(crearTarea.rejected, (state, accion) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })
      // borrar tareas
      .addCase(deleteTarea.pending, (state) => {
        state.isLoading = true;
      })
      // en caso de que sea bien recibido
      .addCase(deleteTarea.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        // como es array se usa el filter que es muy parecido al map
        // accion payloar es lo que va a recibir lo que devuelva como res
        state.message = state.tareas.filter(
          // le estoy pidiendo que me filtre todas las tareas que sean diferentes a action . payload
          // actions.payload devolvera todas las tareas que acabas de borrar
          (tareas) => tareas._id !== actions.payload.id
        );
      })
      // esto es cuando no salio bien
      .addCase(deleteTarea.rejected, (state, accion) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      })

      // get tareas
      .addCase(getTareas.pending, (state) => {
        state.isLoading = true;
      })
      // en caso de que sea bien recibido
      .addCase(getTareas.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        // como es array se usa el push
        // accion payloar es lo que va a recibir lo que devuelva como res
        state.message = actions.payload;
      })
      // esto es cuando no salio bien
      .addCase(getTareas.rejected, (state, accion) => {
        state.isLoading = false;
        state.isError = true;
        state.message = actions.payload;
      });
  },
});

export const { reset } = tareaSlice.actions;

export default tareaSlice.reducer;
