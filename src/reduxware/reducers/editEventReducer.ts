import { createReducer } from "@reduxjs/toolkit";

import { setIsEditEventActive, setEditEventData } from "../actionCreators";
import { RootStateType, Event } from "types";

const initialState = { isEditEventActive: false, data: {} as Event };
export const onlineReducer = createReducer(initialState, builder => {
    builder.addCase(setIsEditEventActive, (state, action) => {
        state.isEditEventActive = action.payload;
    });
    builder.addCase(setEditEventData, (state, action) => {
        state.data = action.payload;
    });
});

export default onlineReducer;
export const isEditEventActiveSelector = (state: RootStateType) => state.editEvent.isEditEventActive;
export const editEventDataSelector = (state: RootStateType) => state.editEvent.data;
