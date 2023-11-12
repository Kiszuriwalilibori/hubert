import { createReducer } from "@reduxjs/toolkit";
import { setCategories } from "../actionCreators";
import { Categories, RootStateType } from "types/index";

const initialState = {
    categories: [
        {
            id: 1,
            name: "Event",
        },
        {
            id: 2,
            name: "Meeting",
        },
    ],
};

export const categoriesReducer = createReducer(initialState, builder => {
    builder.addCase(setCategories, (state, action) => {
        state.categories = action.payload;
    });
});

export const getAllCategories = (state: RootStateType) => state.categories.categories;

export default categoriesReducer;
