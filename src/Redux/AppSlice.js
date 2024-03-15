import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isUserAuthorized:false,
        userData:[],
        isPopularOn:false,
        isLatestOn:false,
        searchText:''
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
        },
        getSearchQuery:(state,action)=>{
             state.searchText=action.payload 
        }
    }
});

export const {isAuth,getUserData,isPopSwitch,isNewSwitch,getSearchQuery} =AppSlice.actions;
export default AppSlice.reducer;