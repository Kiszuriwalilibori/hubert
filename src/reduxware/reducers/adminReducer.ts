import { createReducer } from "@reduxjs/toolkit";

import { setIsAdmin } from "../actionCreators";

const initialState = { isAdmin: false };

export const adminReducer = createReducer(initialState, builder => {
    builder.addCase(setIsAdmin, (state, action) => {
         state.isAdmin = action.payload;
         
    });
});

export default adminReducer;
