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
    changePriority: (id) => ({
        type:    types.TODOS_TASK_CHANGE_PRIORITY,
        payload: id,
    }),
    updateImportant: (id) => ({
        type:    types.TODOS_TASK_IMPORTANT,
        payload: id,
    }),
    updateComplete: (id) => ({
        type:    types.TODOS_TASK_IMPORTANT,
        payload: id,
    }),

    /*loginFail: (error) => ({
        type:    types.LOGIN_FAILED,
        payload: error,
        error:   true,
    }),*/
});
