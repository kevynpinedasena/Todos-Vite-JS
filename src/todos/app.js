import html from './app.html?raw';
import todoStore, { Filters } from "../store/todo.store";
import { renderTodos } from './use-cases/render-todos';
import { renderPending } from './use-cases/render-pending';

const ElementIDs = {
    ClearCompleted: '.clear-completed',
    todoList: '.todo-list',
    NewTodoInput: '#new-todo-input',
    TodoFilters: '.filtro',
    PedingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId 
 */

export const App = ( elementId ) => {

    const displayTodos = () => {
        const todos = todoStore.getTodo( todoStore.getCurrenFilter() );
        renderTodos( ElementIDs.todoList, todos );
        updatePendigCount();
    }

    const updatePendigCount = () => {
        renderPending( ElementIDs.PedingCountLabel );
    }

    // cuando la funcion App() se llama
    (()=> {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();


    // referencias html
    const newDescripcionInput = document.querySelector(ElementIDs.NewTodoInput);
    const todoListUL = document.querySelector(ElementIDs.todoList);
    const clearCompleted = document.querySelector(ElementIDs.ClearCompleted);
    const filtersUL = document.querySelectorAll(ElementIDs.TodoFilters);

    // listeners
    newDescripcionInput.addEventListener('keyup', (event) => {
        if ( event.keyCode !== 13 ) return;

        if ( event.target.value.trim().length === 0 ) return;
    
        todoStore.addTodo(event.target.value);
        displayTodos();
        event.target.value = '';
    });

    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]');
        todoStore.toggleTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    todoListUL.addEventListener('click', (event) => {
        const isDestroyElement = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');

        if ( !isDestroyElement || !element ) return;

        todoStore.deleteTodo( element.getAttribute('data-id') );
        displayTodos();
    });

    clearCompleted.addEventListener('click', (event) => {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersUL.forEach( element => {
        element.addEventListener('click', (element) => {
            filtersUL.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');

            console.log(element.target.text);

            switch (element.target.text) {
                case 'Todos':
                    todoStore.setFilter( Filters.All )
                break;

                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending )
                break;

                case 'Completados':
                    todoStore.setFilter( Filters.Completed )
                break;
            }

            displayTodos();
        })
    });
}