import { useSelector } from "react-redux";
import TodoList from "./components/TodoList";

function App() {
    const { error } = useSelector((state) => state.todos);

    if (error) {
        return <div className="error">
                    <div>⛔Something went wrong</div>
                </div>
    }

    return (
    <main >
        <TodoList/>
    </main>);
}

export default App
