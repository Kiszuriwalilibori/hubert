import { ReactNode } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { Provider } from "react-redux";
import { adminReducer, categoriesReducer, onlineReducer, eventReducer, editEventReducer } from "../reduxware/reducers";
import { HashRouter as Router } from "react-router-dom";
import React from "react";
import { SnackbarProvider } from "notistack";
import logReducer from "reduxware/reducers/logReducer";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material/styles";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
    "@media print": {
        display: "none",
    },
}));

const rootReducer = combineReducers({
    admin: adminReducer,
    online: onlineReducer,
    events: eventReducer,
    editEvent: editEventReducer,
    categories: categoriesReducer,
    log: logReducer,
});

export const store = configureStore({ reducer: rootReducer });
const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Provider store={store}>
            <SnackbarProvider
                maxSnack={3}
                Components={{
                    success: StyledMaterialDesignContent,
                    info: StyledMaterialDesignContent,
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Router>{children}</Router>
            </SnackbarProvider>
        </Provider>
    );
};

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default AppProvider;
