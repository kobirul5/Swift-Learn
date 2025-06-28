import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
    count: number
}

const initialState: InitialState = {
    count: 0
}

const  counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{}


})

export default counterSlice.reducer;