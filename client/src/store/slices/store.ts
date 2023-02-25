import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {authReducer} from "./auth.slice";
import {userReducer} from "./user.slice";

const rootReducer = combineReducers({
    authReducer,
    userReducer
});
export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware({
            serializableCheck: false,
        }),
    });
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];