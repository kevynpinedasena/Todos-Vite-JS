import { Todo } from "../models/todos.model";

/**
 * 
 * @param {Todo} todo 
 */
export const createTodoHTML = ( todo ) => {
    if ( !todo ) throw new Error('A todo objeto es requerido');

    const { done, descripcion, id } = todo; //para destructurar

    const html = `
        <div class="view">
            <input class="toggle" type="checkbox" ${ done ? 'checked' : '' }>
            <label>${ descripcion }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    `;

    const liElement = document.createElement('li');
    liElement.innerHTML = html;
    liElement.setAttribute('data-id', id);

    if ( todo.done ) {
        liElement.classList.add('completed')
    }

    return liElement;
}