import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";
export const useTodo = () => {
    const initialState = [];
    const init = () => {
        return JSON.parse(localStorage.getItem('todos')) || [];
    }
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));


    }, [todos])


    const handleNewTodo = (todo) => {
        const action = {
            type: "add",
            payload: todo,
        }
        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: "delete",
            payload: id,
        });
    };
    const handleToggleTodo = (id) => {
        console.log(id);
        dispatch({
            type: "toggle",
            payload: id,
        });
    };

    const todosCount = todos.length;

    const pendingTodosCount = todos.filter(todo => !todo.done).length;

    return {
        ...todos,
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,
    
    }
}