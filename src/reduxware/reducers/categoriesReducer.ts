import { createReducer } from "@reduxjs/toolkit";
import { setCategories } from "../actionCreators";
import { Categories, RootStateType } from "types/index";

const initialState = {
    categories: [
        {
            Id: 1,
            Name: "Event",
            Color: "#E25141",
        },
        {
            Id: 2,
            Name: "Meeting",
            Color: "#4153AF",
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
