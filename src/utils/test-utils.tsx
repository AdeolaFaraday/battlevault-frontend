import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../lib/redux/authSlice';

export function renderWithRedux(
    ui: React.ReactElement,
    {
        preloadedState = {},
        store = configureStore({
            reducer: { auth: authReducer },
            preloadedState
        },
        ),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }: { children: any }) {
        return <Provider store={store}> {children} </Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
