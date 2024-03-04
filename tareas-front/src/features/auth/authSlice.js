// esto de aqui sera para la autenticacion de usuario 
// importar de la libreria que descargamos y de ahi sacomos dos metodos 
import {createSlice, createAsynThunk} from '@reduxjs/toolkit'

// obtenemos los datos del Usuario mediante el localStorage (ahi esta le token )
const user = JSON.parse( localStorage.getItem('user'))

// crear un estado inical para nuestra rebanada ( para nuestro Slice ), este es un objeto 

const initialState = {
    // operador ternario: si existe user usalo, o si no, ponlo como null
    user: user ? user : null,
    // mal
    isError: false,
    // bien 
    isSuccess : false,
    // en espera 
    isLoading : false,
    // si sale un error aqui cacha el mensaje
    message: ''
}

// registrar un usuario 
// como paramento createAsynThunk va a tener 1 el prefijo, como se va a poder identificar, el nombre del Slice 
//  como paramento 2 va a tener la funcion en si junto con sus datos 
export const register =  createAsynThunk( 'auth/register', async( user, thunkAPI) => {
    try {
        return await authService.register(true)
        
    } catch (error) {
        
    }
})

//  exportar creando un Slice 
export const authSlice = createSlice({
    // como se llamara el Slice
    name : 'auth',
    // como se inicializa 
    initialState, 
    // createAsynThunk acepta como tres tipos de parametros, uno de ellos es Type que genera las siguientes acciones, pending, reject o fulfilled
    reducers:{
        //  reste es una 'accion ' dentro llevara un metodo que es para resetear, cuando se se quiera usar solo se debe mandar a llamar (ES UNA FUNCTION (su parametro es state ) =>{})
        reset:(state) => {
            state.isError= false,
            state.isLoading = false,
            state.isSuccess= false
            state.message = ''
        }
    }, 
    extraReducers: () => {

    }

})

// exportar la accion 
export const {reset} = authSlice.actions
// exportar el Slice
export default authSlice.reducer

// esta es a estructura basica de un Slice 