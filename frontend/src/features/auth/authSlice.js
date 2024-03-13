import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
//  get user form local storage
const user = JSON.parse(localStorage.getItem('user'))
const intialState = {
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
export const authSlice= createSlice ({
    name:'auth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message= ''
        }
    },
    extraReducers:()=>{

    }
})
export const {reset} = authSlice.actions
export default authSlice.reducer