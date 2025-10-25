import { useDispatch } from "react-redux";
import { deleteTodo, editTodo, toggleTodo } from "../store/todosSlice";
import { useRef, useState } from "react";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
function TodoItem({data}) {
    const dispatch = useDispatch();
    const [isEdit,setIsEdit] = useState(false);
    const [title,setTitle] = useState(data.title)

    const inputRef = useRef(null);

    function toggle(){
        dispatch(toggleTodo(data.id))
    }

    function handleChange(e){
        setTitle(e.target.value)
    }
    function startEdit() {
        setIsEdit(true);
        // focus after a short delay so that the input has time to draw
        setTimeout(() => {
            inputRef.current?.focus();
        }, 0);
    }

    function handleSaveChanges(e){
        e.preventDefault();
        
        setIsEdit(false);

        if(title.trim().length === 0) return;//check isn`t title empty

        const newTask = {...data,title:title}
        dispatch(editTodo(newTask))
    }
    return (
    <li className="task">
        <div className="title-container" onClick={()=> !isEdit ? toggle() : null}>
            <input type="checkbox" checked={data.completed} />
            {isEdit?
                <form onSubmit={handleSaveChanges}>
                    <input type="text" value={title} onChange={handleChange} ref={inputRef} className="edit-title"/>
                </form>
                :
                <span style={data.completed ? {textDecoration: "line-through",color:"#9D9DA8"}:{}}>
                    {data.title}
                </span>
            }
        </div>
        <div className="control-buttons">
            {isEdit
                ? <button className="btn btn-save" type="submit" onClick={handleSaveChanges}><SaveOutlinedIcon/></button>
                : <button className="btn btn-edit"onClick={startEdit}><EditOutlinedIcon/></button>
            }
            <button className="btn btn-delete" onClick={()=>dispatch(deleteTodo(data.id))}><DeleteOutlinedIcon/></button>
        </div>
    </li>
    );
}

export default TodoItem;