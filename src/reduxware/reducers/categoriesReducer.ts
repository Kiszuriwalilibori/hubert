import { createReducer } from "@reduxjs/toolkit";
import { setCategories } from "../actionCreators";
import { Categories, RootStateType } from "types";

const initialState = {
    categories: [
        {
            id: 1,
            name: "Event",
            color: "#E25141",
        },
        {
            id: 2,
            name: "Meeting",
            color: "#4153AF",
        },
    ],
};

export const categoriesReducer = createReducer(initialState, builder => {
    builder.addCase(setCategories, (state, action) => {
        state.categories = action.payload;
    });
});

export const getCategoriesSelector = (state: RootStateType) => state.categories.categories;

export default categoriesReducer;
