// Instruments
import types from 'actions/types';
import { fromJS } from 'immutable';

const initialState = fromJS({
    todos: [
        {
            id:        'xjh',
            message:   'Успешно пройти React-интенсив компании Lectrum',
            completed: true,
            important: true,
        },
        {
            id:        'xjr',
            message:   'Взять автограф у Джареда Лето',
            completed: false,
            important: false,
        },
        {
            id:        'xrh',
            message:   'Зарегестрировать бабушку в Твиче',
            completed: false,
            important: false,
        },
        {
            id:        'rjh',
            message:   'Записать собаку на груминг',
            completed: false,
            important: false,
        },
        {
            id:        'xph',
            message:   'Научиться играть на барабанах',
            completed: false,
            important: false,
        }
    ],
});

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TODOS_SEARCH_TASK:
            return state.find(
                (task) => task.get('message').indexOf(action.payload) !== -1
            );

        case types.TODOS_ADD_TASK:
            return state.update('todos', (todos) =>
                todos.push(fromJS(action.payload))
            );

        case types.TODOS_TASK_CHANGE_PRIORITY:
            return state.update('todos', (todos) =>
                todos.map(
                    (todo) =>
                        todo.get('id') === action.payload
                            ? todo.set('important', !todo.get('important'))
                            : todo
                )
            );

        case types.TODOS_TASK_COMPLETE:
            return state.update('todos', (todos) =>
                todos.map(
                    (todo) =>
                        todo.get('id') === action.payload
                            ? todo.set('completed', !todo.get('completed'))
                            : todo
                )
            );

        case types.TODOS_ALL_COMPLETE:
            return state.update('todos', (todos) =>
                todos.map((todo) => todo.set('completed', !action.payload))
            );

        default:
            return state;
    }
};
