import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tareaService from "./tareasServices";
const initialState = {
  taras: [],
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
      const token = thunkAPI.getState().auth.user.token
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

export const tareaSlice = createSlice({
  name: "tarea",
  initialState,
  reducer: {
    reset: (state) => initialState,
  },
  extraReducers: () => {},
});

export const { reset } = tareaSlice.actions;

export default tareaSlice.reducer;
