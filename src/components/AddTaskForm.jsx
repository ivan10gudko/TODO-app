import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../store/todosSlice";

function AddTaskForm() {
    const [title,setTitle] = useState("");
    const dispatch = useDispatch();
    
    // Find the maximum ID value, or return 0 if the array is empty
    const maxId = useSelector(state => {
            const ids = state.todos.items.map(item => item.id);
            return ids.length > 0 ? Math.max(...ids) : 0;
});
    
    function handleChange(e){
        setTitle(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();

        if(title.trim().length === 0) return;//check isn`t title empty

        const newTask = {
            id:maxId+1,
            userId:1,
            title:title,
            completed:false,
        }

        dispatch(addTodo(newTask));
        
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <input type="text" value={title} placeholder="Add a new task..." onChange={handleChange} />
            <input type="submit" value="ADD" />
        </form>
    );
}

export default AddTaskForm;