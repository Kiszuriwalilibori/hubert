import { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";

import { adminReducer } from "../reduxware/reducers";

import "styles/App.css";
import "../i18n/config";
import React from "react";

const rootReducer = combineReducers({
    admin: adminReducer,
});

export const store = configureStore({ reducer: rootReducer });
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default AppProvider;
