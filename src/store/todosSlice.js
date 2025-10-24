import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    items: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
};

// --- async fetch of todos ---
export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
            return res.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.items.unshift(action.payload);
        },
        toggleTodo: (state, action) => {
            const todo = state.items.find((t) => t.id === action.payload);
            if (todo) todo.completed = !todo.completed;
        },
        deleteTodo: (state, action) => {
            state.items = state.items.filter((t) => t.id !== action.payload);
        },
        editTodo: (state, action) => {
            const { id, title } = action.payload;
            const todo = state.items.find((t) => t.id === id);
            if (todo) todo.title = title;
        },
    },
    extraReducers: (builder) => {
    builder
        .addCase(fetchTodos.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        });
    },
});


export const { addTodo, toggleTodo, deleteTodo, editTodo } = todosSlice.actions;
export default todosSlice.reducer;
