//  aqui es donde se amacenaran todas as rebanadas (todos los Slices)
// importar unas cosas y tambien importar el slice 
import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";

// se va a importar Store junto con un metodo de configuracion, el cual es un objeto 
export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
