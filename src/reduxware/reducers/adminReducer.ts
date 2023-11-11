import { createReducer } from "@reduxjs/toolkit";

import { setIsAdmin } from "../actionCreators";
import { RootStateType } from "types/index";

const initialState = { isAdmin: false };

export const adminReducer = createReducer(initialState, builder => {
    builder.addCase(setIsAdmin, (state, action) => {
        state.isAdmin = action.payload;
    });
});
export const isAdminSelector = (state: RootStateType) => state.admin.isAdmin;
export default adminReducer;
