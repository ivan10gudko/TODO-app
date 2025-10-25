import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./todosSlice"
import {loadTodos, saveTodos } from "../services/localStorage";

const persistedItems = loadTodos();

export const store = configureStore({
    reducer:{
        todos: todosReducer,
    },
    preloadedState: {
        todos: { items: persistedItems || [] },
    },
});
//save items to localStorage after every change
store.subscribe(() => {
    const state = store.getState();
    saveTodos(state.todos.items);
});