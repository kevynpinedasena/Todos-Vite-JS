import todoStore, { Filters } from "../../store/todo.store";

let element;

/**
 * 
 * @param {string} elemenId 
 */
export const renderPending = ( elemenId ) => {

    if ( !element ) {
        element = document.querySelector( elemenId );
    }

    if ( !element ) {
        throw new Error(`Element ${ elemenId } not found`);
    }

    element.innerHTML = todoStore.getTodo( Filters.Pending ).length;
}