import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movies",
    initialState:{
        nowPlayingMovies : null,
        PopularMovies:null,
        TopRatedMovies:null,
        UpcomingMovies:null,
        trailerVideos:null,
    },
    reducers:{
        addNowPlayingMovies:(state,action) =>{
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovies:(state,action) =>{
            state.PopularMovies = action.payload;
        },
        addTopRatedMovies:(state,action) =>{
            state.TopRatedMovies = action.payload;
        },
        addUpcomingMovies:(state,action) =>{
            state.UpcomingMovies = action.payload;
        },
        addTrailerVideos:(state,action) =>{
            state.trailerVideos = action.payload;
        }
        
    }
})

export const {addNowPlayingMovies,addTrailerVideos,addPopularMovies,addTopRatedMovies,addUpcomingMovies} = movieSlice.actions;
export default movieSlice.reducer;