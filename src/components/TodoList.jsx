import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todosSlice";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";
import TodoItemSceleton from "./TodoItemSceleton";

function TodoList() {
    const dispatch = useDispatch();
    const { items, status} = useSelector((state) => state.todos);

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return ( <div>
        <h1>TODO-LIST</h1>
        <AddTaskForm />
        <ul>{
            status=="loading"
            ?Array.from({ length: 10 }).map((v,i)=><TodoItemSceleton key={i}/>)
            :items.map(item=><TodoItem key={item.id}  data={item}/>)
            }
        </ul>

    </div> );
}

export default TodoList;