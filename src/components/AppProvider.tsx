import { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { adminReducer, categoriesReducer, onlineReducer, eventReducer, editEventReducer } from "../reduxware/reducers";

import React from "react";
import { SnackbarProvider } from "notistack";

const rootReducer = combineReducers({
    admin: adminReducer,
    online: onlineReducer,
    events: eventReducer,
    editEvent: editEventReducer,
    categories: categoriesReducer,
});

export const store = configureStore({ reducer: rootReducer });
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                {children}
            </SnackbarProvider>
        </Provider>
    );
};

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default AppProvider;
