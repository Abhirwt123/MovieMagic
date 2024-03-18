import { createSlice } from "@reduxjs/toolkit";

const AppSlice = createSlice({
    name: 'app',
    initialState: {
        isUserAuthorized:false,
        userData:[],
        isPopularOn:false,
        isLatestOn:false,
        searchText:'',
        FavMovieList:''
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
        },
        getFavMovie:(state,action)=>{
           state.FavMovieList.action.payload
        }
    }
});

export const {isAuth,getUserData,isPopSwitch,isNewSwitch,getSearchQuery,getFavMovie} =AppSlice.actions;
export default AppSlice.reducer;