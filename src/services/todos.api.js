import axios from "axios";

const todos = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export async function getTodos() {
    const res = await todos.get("/todos?_limit=100")
    return res.data;
}

export async function addTodo(todo) {
    const res = await todos.post("/todos",todo)
    return res.data;
}

export async function updateTodo(id,data) {
    const res = await todos.put(`/todos/${id}`, data);
    return res.data;
}

export async function deleteTodo(id){
    const res = await todos.delete(`/todos/${id}`);
    return res.data;
}