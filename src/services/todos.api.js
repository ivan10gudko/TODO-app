import axios from "axios";

const todos = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export async function getTodos() {
    const res = await todos.get("/todos?_limit=100")
    return res.data;
}