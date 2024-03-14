import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isUserAuthorized:false,
        userData:[],
        isPopularOn:false,
        isLatestOn:false
    },
    reducers: {
        isAuth: (state) => {
            state.isUserAuthorized=true;
        },
        getUserData:(state,action)=>{
         state.userData.push(action.payload)
        },
        isPopSwitch:(state)=>{
            state.isPopularOn=!state.isPopularOn;
        },
        isNewSwitch:(state)=>{
            state.isLatestOn=!state.isLatestOn;
        }
    }
});

export const {isAuth,getUserData,isPopSwitch,isNewSwitch} =AppSlice.actions;
export default AppSlice.reducer;