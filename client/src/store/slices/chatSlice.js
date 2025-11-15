import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {axiosInstance} from '../../lib/axios';
import {toast} from 'react-toastify';

export const getUsers = createAsyncThunk("chat/getUsers",async(_, thunkAPI) => {
    try{
        const res = await axiosInstance.get("/message/users");
        return res.data.users;
    }
    catch(error) {
        toast.error(error.response?.data?.message);
        return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
});

export const getMessages = createAsyncThunk("chat/getMessages",async(userId,thunkAPI)=> {
    try{
        const res = await axiosInstance.get(`/message/${userId}`);
        return res.data;
    }
    catch(error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const sendMessage = createAsyncThunk("chat/sendMessage",async (messageData,thunkAPI) => {
    try{
        const {chat} = thunkAPI.getState();
        const res= await axiosInstance.post(
            `/message/send/${chat.selectedUser._id}`,messageData
        );
        return res.data;
    }
    catch(error) {
        toast.error(error.response.data.message);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

const chatSlice = createSlice({
    name:"chat",
    initialState:{
        messages:[],
        users:[],
        selectedUser:null,
        isUserLoading:false,
        isMessagesLoading:false,
    },
    reducers:{
        setSelectedUser:(state,action)=>{
            state.selectedUser = action.payload;
        },
        pushNewMessage:(state,action) =>{
            const msg = action.payload;
            const exists = state.messages.some((m) => m._id === msg._id);
            
            if(!exists) {
                state.messages.push(msg);
            }
            // state.messages.push(action.payload);
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(getUsers.pending,(state) =>{
            state.isUsersLoading = true;
        })
        .addCase(getUsers.fulfilled,(state,action) => {
            state.users = action.payload;
            state.isUsersLoading = false;
        })
        .addCase(getUsers.rejected,(state) => {
            state.isUsersLoading = false;
        })
        .addCase(getMessages.pending,(state)=>{
            state.isMessagesLoading=true;
        })
        .addCase(getMessages.fulfilled,(state,action) =>{
            const uniqueMessages = [];
            const map=new Map();
            action.payload.messages.forEach((msg) => {
                if(!map.has(msg._id)) {
                    map.set(msg._id,true);
                    uniqueMessages.push(msg);
                }
            });
            state.messages = uniqueMessages;
            // state.messages = action.payload.messages;
            state.isMessagesLoading = false;
        })
        .addCase(getMessages.rejected,(state,action)=> {
            state.isMessagesLoading = false;
        })
        .addCase(sendMessage.fulfilled,(state,action)=> {
            const msg= action.payload;
            const exists =state.messages.some((m)=> m._id === msg._id);
            if(!exists) state.messages.push(msg);

            // state.messages.push(action.payload);
        });
    },
});

export const {setSelectedUser,pushNewMessage} = chatSlice.actions;
export default chatSlice.reducer;