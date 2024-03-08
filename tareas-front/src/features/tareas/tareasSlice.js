import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState={
    taras:[],
    isError: false ,
    isSuccess: false, 
    isLoading:false, 
    message:''
}
export const tareaSlice = createSlice({
    name :'tarea',
    initialState,
    reducer:{
        reset: (state)=>initialState

    },
    extraReducers: ()=> {

    }
})

export const {reset} = tareaSlice.actions

export default tareaSlice.reducer;
