// Types
import types from './types';

export default Object.freeze({
    // Todos
    allComplete: (flag) => ({
        type:    types.TODOS_ALL_COMPLETE,
        payload: flag,
    }),
    addTask: (task) => ({
        type:    types.TODOS_ADD_TASK,
        payload: task,
    }),
    deleteTask: (id) => ({
        type:    types.TODOS_TASK_DELETE,
        payload: id,
    }),
    updateTask: (task) => ({
        type:    types.TODOS_UPDATE_TASK,
        payload: task,
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
