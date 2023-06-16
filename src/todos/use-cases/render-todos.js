import { Todo } from "../models/todos.model";
import { createTodoHTML } from "./create-todo-html";

let element;

/**
 * 
 * @param {string} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = ( elementoId, todos = [] ) => {
    
    if ( !element) {
        element = document.querySelector(elementoId);
    }

    if ( !element ) throw new Error(`element ${ elementoId } not found`);

    element.innerHTML = '';

    todos.forEach( todo => {
        element.append( createTodoHTML(todo) )
    });
}