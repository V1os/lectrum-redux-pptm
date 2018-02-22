// Types
import types from './types';

export default Object.freeze({
    allComplete: (params) => ({
        type:    types.ALL_COMPLETE,
        payload: params,
    }),
    allCompleteSuccess: (tasks) => ({
        type:    types.ALL_COMPLETE_SUCCESS,
        payload: tasks,
    }),
    searchTask: (query) => ({
        type:    types.TODOS_SEARCH_TASK,
        payload: query,
    }),
    resetList: (state) => ({
        type:    types.TODOS_RESET,
        payload: state,
    }),

    changePriority: (todo) => ({
        type:    types.CHANGE_PRIORITY,
        payload: todo,
    }),
    changePrioritySuccess: (id) => ({
        type:    types.CHANGE_PRIORITY_SUCCESS,
        payload: id,
    }),

    completeTask: (todo) => ({
        type:    types.COMPLETE_TASK,
        payload: todo,
    }),
    completeTaskSuccess: (id) => ({
        type:    types.COMPLETE_TASK_SUCCESS,
        payload: id,
    }),

    readTask: () => ({
        type: types.READ_TASK,
    }),
    readTaskSuccess: (data) => ({
        type:    types.READ_TASK_SUCCESS,
        payload: data,
    }),
    readTaskFail: (message) => ({
        type:    types.READ_TASK_FAIL,
        payload: message,
        error:   true,
    }),

    createTask: (message) => ({
        type:    types.CREATE_TASK,
        payload: message,
    }),
    createTaskSuccess: (task) => ({
        type:    types.CREATE_TASK_SUCCESS,
        payload: task,
    }),
    createTaskFail: (message) => ({
        type:    types.CREATE_TASK_FAIL,
        payload: message,
        error:   true,
    }),

    updateTask: (tasks) => ({
        type:    types.UPDATE_TASK,
        payload: tasks,
    }),
    updateTaskSuccess: (task) => ({
        type:    types.UPDATE_TASK_SUCCESS,
        payload: task,
    }),
    updateTaskFail: (message) => ({
        type:    types.UPDATE_TASK_FAIL,
        payload: message,
        error:   true,
    }),

    deleteTask: (id) => ({
        type:    types.DELETE_TASK,
        payload: id,
    }),
    deleteTaskSuccess: (id) => ({
        type:    types.DELETE_TASK_SUCCESS,
        payload: id,
    }),
    deleteTaskFail: (message) => ({
        type:    types.DELETE_TASK_FAIL,
        payload: message,
        error:   true,
    }),
});
