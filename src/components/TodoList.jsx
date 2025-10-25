import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../store/todosSlice";
import TodoItem from "./TodoItem";
import AddTaskForm from "./AddTaskForm";
import TodoItemSceleton from "./TodoItemSceleton";
import Pagination from "./Pagination";

function TodoList() {
    const dispatch = useDispatch();
    const { items, status} = useSelector((state) => state.todos);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = items.slice(startIndex, startIndex + itemsPerPage);


    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return ( <div>
        <h1>TODO-LIST</h1>
        <AddTaskForm />
        <ul>{
            status=="loading"
            ?Array.from({ length: 10 }).map((v,i)=><TodoItemSceleton key={i}/>)
            :visibleItems.map(item=><TodoItem key={item.id}  data={item}/>)
            }
        </ul>
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page)=>{
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }}
        />

    </div> );
}

export default TodoList;