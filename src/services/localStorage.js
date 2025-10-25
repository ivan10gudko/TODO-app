
export const loadTodos = () => {
    try {
        const serialized = localStorage.getItem("todos_items");
        if (!serialized) return undefined;
        return JSON.parse(serialized);
    } catch (err) {
        console.error("Load error:", err);
        return undefined;
    }
};

export const saveTodos = (items) => {
    try {
        const serialized = JSON.stringify(items);
        localStorage.setItem("todos_items", serialized);
    } catch (err) {
        console.error("Save error:", err);
    }
};
