import { createReducer } from "@reduxjs/toolkit";
import { setEvents } from "../actionCreators";
import { Events } from "types/index";

const initialState = { events: [] as Events };

export const adminReducer = createReducer(initialState, builder => {
    builder.addCase(setEvents, (state, action) => {
        state.events = action.payload;
    });
});

export default adminReducer;
