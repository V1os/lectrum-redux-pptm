// Instruments
import types from 'actions/types';
import { getUniqueID } from 'helpers';

const initialState = {
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
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TODOS_SEARCH_TASK:
            return state.filter(
                (task) => task.message.indexOf(action.payload) !== -1
            );

        case types.TODOS_ADD_TASK:
            return Object.assign(
                {
                    id:        getUniqueID(4),
                    completed: false,
                    important: false,
                    message:   action.payload,
                },
                state.todos
            );

        case types.TODOS_TASK_IMPORTANT:
        case types.TODOS_TASK_CHANGE_PRIORITY:
        case types.TODOS_ALL_COMPLETE: {
            console.log(this.state);

            return state.todos.map((todo) => {
                todo.completed = !action.payload;

                return todo;
            });
        }
        case types.TODOS_TASK_COMPLETE:
        default:
            return state;
    }
};
