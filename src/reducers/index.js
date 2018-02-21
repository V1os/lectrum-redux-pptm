// Instruments
import types from 'actions/types';
import { fromJS } from 'immutable';

const initialState = fromJS({ todos: []});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TODOS_SEARCH_TASK:
            return state.update('todos', (todos) =>
                todos.filter(
                    (task) => task.get('message').indexOf(action.payload) !== -1
                )
            );

        case types.CHANGE_PRIORITY_SUCCESS:
            return state.update('todos', (todos) =>
                todos.map(
                    (todo) =>
                        todo.get('id') === action.payload
                            ? todo.set('favorite', !todo.get('favorite'))
                            : todo
                )
            );

        case types.COMPLETE_TASK_SUCCESS:
            return state.update('todos', (todos) =>
                todos.map(
                    (todo) =>
                        todo.get('id') === action.payload
                            ? todo.set('completed', !todo.get('completed'))
                            : todo
                )
            );

        case types.ALL_COMPLETE_SUCCESS:
        case types.TODOS_RESET:
            return action.payload;

        case types.READ_TASK_SUCCESS:
            return fromJS(action.payload);

        case types.UPDATE_TASK_SUCCESS:
            return state.update('todos', (todos) =>
                todos.map((task) => {
                    if (task.get('id') === action.payload.id) {
                        return task.set('message', action.payload.message);
                    }

                    return task;
                })
            );

        case types.DELETE_TASK_SUCCESS:
            return state.update('todos', (todos) =>
                todos.filter((task) => task.get('id') !== action.payload)
            );

        case types.CREATE_TASK_SUCCESS:
            return state.update('todos', (todos) =>
                todos.unshift(fromJS(action.payload))
            );

        default:
            return state;
    }
};
