import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';
import { instance } from '../services';

interface UserBio {
  userBio: string | null,
  userEmail:string,
  userToken: string,
   userName: string,
   userImage: string,
}

interface User {
  userEmail:string,
  userToken: string,
   userName: string,
   userBio: string | null,
   userImage:string,
   userLoginError: string,
}

const initialState: User = {
    userEmail:'',
    userToken: '',
     userName: '',
     userBio: '',
     userImage: '',
     userLoginError: '',
}

const userSlice = createSlice(
    {name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserBio> ) {
            state.userEmail = action.payload.userEmail;
            state.userToken = action.payload.userToken;
            state.userName = action.payload.userName;
            state.userBio = action.payload.userBio;
            state.userImage = action.payload.userImage;

        },
        removeUser(state) {
            state.userEmail = '';
            state.userToken = '';
            state.userName = '';
            state.userBio = '';
            state.userImage = '';
        },

        setUserLoginError(state, action ) {

            state.userLoginError = action.payload;

        },
    }
})

export const {setUser, removeUser, setUserLoginError} = userSlice.actions;

export default userSlice.reducer;















