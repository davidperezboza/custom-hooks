import { useEffect, useReducer } from 'react';
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = (todos) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todos,
        };

        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id,
        });       
    }

    const handleToogleTodo = (id) => {
        console.log({id});
        dispatch({
            type: '[TODO] Toogle Todo',
            payload: id,
        });       
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToogleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
    };
 
}
