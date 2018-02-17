// Types
import types from './types';

export default Object.freeze({
    // Todos
    allComplete: (flag) => ({
        type:    types.TODOS_ALL_COMPLETE,
        payload: flag,
    }),
    addTask: (message) => ({
        type:    types.TODOS_ADD_TASK,
        payload: message,
    }),
    updateTask: (newMessage) => ({
        type:    types.TODOS_UPDATE_TASK,
        payload: newMessage,
    }),
    searchTask: (query) => ({
        type:    types.TODOS_SEARCH_TASK,
        payload: query,
    }),
    // Tasks action
    changePriority: (id) => ({
        type:    types.TODOS_TASK_CHANGE_PRIORITY,
        payload: id,
    }),
    updateComplete: (id) => ({
        type:    types.TODOS_TASK_COMPLETE,
        payload: id,
    }),
});
