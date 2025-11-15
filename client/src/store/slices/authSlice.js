import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from '../../lib/axios';
import {connectSocket,disconnectSocket} from '../../lib/socket';
import { toast } from "react-toastify";

export const getUser =createAsyncThunk("user/me",async(_, thunkAPI)=>{
    try{
        const res = await axiosInstance.get("/user/me");
        connectSocket(res.data.user);
        return res.data.user;
    }
    catch(error) {
         console.log("Error fetching user: ",error);
         return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch user");
    }
});

export const logout = createAsyncThunk("user/sign-out",async(_, thunkAPI) =>{
    try{
      await axiosInstance.get("/user/sign-out");
      disconnectSocket();

      return null;
    }
    catch(error) {
      toast.error(error.response.data.message);
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
})

export const login = createAsyncThunk("user/sign-in",async (data,thunkAPI)=>{
    try{
        const res = await axiosInstance.post("/user/sign-in",data,{
            withCredentials:true,
        });
        connectSocket(res.data.user);
        
        return res.data.user;
    
    }
    catch(error) {
        const message=error.response?.data?.message || "Invalid credentials";
        
        return thunkAPI.rejectWithValue(message);
    }
});


export const signup = createAsyncThunk("auth/sign-up",async(data,thunkAPI)=>{
    try{
        const res=await axiosInstance.post("/user/sign-up",data,{
            withCredentials:true,
        });
        connectSocket(res.data.user);
        
        return res.data.user;
    }
    catch(error) {
        const message = error.response?.data?.message || "Registration failed";
        return thunkAPI.rejectWithValue(message);
    }
});

export const updateProfile = createAsyncThunk(
    "user/update-profile",
    async(data,thunkAPI) => {
        try{
            const res = await axiosInstance.put("/user/update-profile",data);
            toast.success("Profile updated successfully");
            return res.data;
        }
        catch(error) {
            toast.error(error.response.data.message);
            return thunkAPI.rejectWithValue(error.response.data.message);
        }
    }
)



const authSlice = createSlice({
    name:"auth",
    initialState:{
        authUser:null,
        isSigningUp:false,
        isLoggingIn:false,
        isUpdatingProfile:false,
        isCheckingAuth:true,
        onlineUsers:[],
    },
    reducers:{
        setOnlineUsers(state,action) {
             state.onlineUsers = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getUser.fulfilled,(state,action)=>{
            state.authUser=action.payload;
            state.isCheckingAuth =false;
        })
        .addCase(getUser.rejected,(state,action)=> {
            state.authUser =null;
            state.isCheckingAuth = false;
        }).addCase(logout.fulfilled,(state) =>{
            state.authUser = null;
        }).addCase(logout.rejected,(state)=> {
            state.authUser = state.authUser;
        }).addCase(login.pending,(state)=>{
            state.isLoggingIn =true;
        }).addCase(login.fulfilled,(state,action)=>{
            state.authUser = action.payload;
            state.isLoggingIn=false;
        }).addCase(login.rejected,(state)=>{
            state.isLoggingIn = false;
        }).addCase(signup.pending,(state)=>{
            state.isSigningUp = true;
        }).addCase(signup.fulfilled,(state,action)=>{
            state.authUser = action.payload;
            state.isSigningUp = false;
        }).addCase(signup.rejected,(state)=>{
            state.isSigningUp = false;
        }).addCase(updateProfile.pending,(state) => {
            state.isUpdatingProfile = true;
        }).addCase(updateProfile.fulfilled,(state,action) => {
            state.authUser = action.payload;
            state.isUpdatingProfile = false;
            disconnectSocket();
            connectSocket(action.payload._id);
        }).addCase(updateProfile.rejected,(state) => {
            state.isUpdatingProfile = false;
        });
    },
});

export const {setOnlineUsers} = authSlice.actions;
export default authSlice.reducer;