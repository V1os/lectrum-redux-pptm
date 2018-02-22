// Instruments
import reducers from './';
import { fromJS } from 'immutable';
import stateJSON from 'components/Scheduler/todos';

const initialState = fromJS(stateJSON);
const task = {
    id:        'hjx',
    message:   'test',
    completed: false,
    favorite:  false,
};
const stateSearch = fromJS({
    todos: [
        {
            id:        'xjh',
            message:   'Успешно пройти React-интенсив компании Lectrum',
            completed: true,
            favorite:  true,
        }
    ],
});
const stateAdd = initialState.update('todos', (todos) =>
    todos.unshift(fromJS(task))
);
const stateChangePriority = initialState.update('todos', (todos) =>
    todos.map(
        (todo) =>
            todo.get('id') === 'xjh'
                ? todo.set('favorite', !todo.get('favorite'))
                : todo
    )
);
const stateTaskComplete = initialState.update('todos', (todos) =>
    todos.map(
        (todo) =>
            todo.get('id') === 'xjh'
                ? todo.set('completed', !todo.get('completed'))
                : todo
    )
);

const stateTaskUpdate = initialState.update('todos', (todos) =>
    todos.map((todo) => {
        if (todo.get('id') === 'xjh') {
            return todo.set('message', 'new test task');
        }

        return todo;
    })
);

const stateTaskDelete = initialState.update('todos', (todos) =>
    todos.filter((todo) => todo.get('id') !== 'xjh')
);

describe('Reducers', () => {
    test('search task reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_SEARCH_TASK',
                payload: 'Lectrum',
            })
        ).toEqual(stateSearch);
    });

    test('create task successful reducer', () => {
        expect(
            reducers(initialState, {
                type:    'CREATE_TASK_SUCCESS',
                payload: task,
            })
        ).toEqual(stateAdd);
    });

    test('change priority success reducer', () => {
        expect(
            reducers(initialState, {
                type:    'CHANGE_PRIORITY_SUCCESS',
                payload: 'xjh',
            })
        ).toEqual(stateChangePriority);
    });

    test('complete task success reducer', () => {
        expect(
            reducers(initialState, {
                type:    'COMPLETE_TASK_SUCCESS',
                payload: 'xjh',
            })
        ).toEqual(stateTaskComplete);
    });

    test('update task success reducer', () => {
        expect(
            reducers(initialState, {
                type:    'UPDATE_TASK_SUCCESS',
                payload: { id: 'xjh', message: 'new test task' },
            })
        ).toEqual(stateTaskUpdate);
    });

    test('delete task reducer', () => {
        expect(
            reducers(initialState, {
                type:    'DELETE_TASK_SUCCESS',
                payload: 'xjh',
            })
        ).toEqual(stateTaskDelete);
    });

    test('all complete success reducer', () => {
        expect(
            reducers(initialState, {
                type:    'ALL_COMPLETE_SUCCESS',
                payload: initialState,
            })
        ).toEqual(initialState);
    });

    test('read task success success reducer', () => {
        expect(
            reducers(initialState, {
                type:    'READ_TASK_SUCCESS',
                payload: [{}],
            })
        ).toEqual(fromJS([{}]));
    });

    test('reset reducer', () => {
        expect(
            reducers(
                {},
                {
                    type:    'TODOS_RESET',
                    payload: initialState,
                }
            )
        ).toEqual(initialState);
    });

    test('default reducer by undefined type', () => {
        expect(reducers(initialState, { type: '___' })).toEqual(initialState);
    });

    test('default reducer by init state', () => {
        expect(reducers(undefined, { type: '___' })).toEqual(
            fromJS({ todos: []})
        );
    });
});
