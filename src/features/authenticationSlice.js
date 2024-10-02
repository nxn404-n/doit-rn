import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers:{},
})

export default authenticationSlice.reducer;