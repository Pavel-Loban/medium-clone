import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface UserSliceState {
//     userEmail:  null |string ;
//     userToken: string | null;
//     //  id: number | null;
//     userName: string | null;
// }

const initialState = {
    userEmail: null,
    userToken: null,
    //  id: null,
     userName: null,
}

const userSlice = createSlice(
    {name: 'user',
    initialState,
    reducers: {
        setUser(state, action ) {
            state.userEmail = action.payload.userEmail;
            state.userToken = action.payload.userToken;
            // state.id = action.payload.id;
            state.userName = action.payload.userName;

        },
        removeUser(state) {
            state.userEmail = null;
            state.userToken = null;
            // state.id = null;
            state.userName = null;
        },
    }
})

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;