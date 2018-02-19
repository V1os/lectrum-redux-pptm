// Instruments
import reducers from './';
import { fromJS } from 'immutable';
import stateJSON from 'components/Scheduler/todos';

const initialState = fromJS(stateJSON);
const task = {
    id:        'hjx',
    message:   'test',
    completed: false,
    important: false,
};
const stateSearch = fromJS({
    todos: [{
        id:        'xjh',
        message:   'Успешно пройти React-интенсив компании Lectrum',
        completed: true,
        important: true,
    }],
});
const stateAdd = initialState.update('todos', (todos) =>
    todos.unshift(fromJS(task))
);
const stateChangePriority = initialState.update('todos', (todos) =>
    todos.map(
        (todo) =>
            todo.get('id') === 'xjh'
                ? todo.set('important', !todo.get('important'))
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

const stateAllComplete = initialState.update('todos', (todos) =>
    todos.map((todo) => todo.set('completed', false))
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

    test('add task reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_ADD_TASK',
                payload: task,
            })
        ).toEqual(stateAdd);
    });

    test('change priority reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_TASK_CHANGE_PRIORITY',
                payload: 'xjh',
            })
        ).toEqual(stateChangePriority);
    });

    test('task complete reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_TASK_COMPLETE',
                payload: 'xjh',
            })
        ).toEqual(stateTaskComplete);
    });

    test('update task reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_UPDATE_TASK',
                payload: { id: 'xjh', message: 'new test task' },
            })
        ).toEqual(stateTaskUpdate);
    });

    test('delete task reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_TASK_DELETE',
                payload: 'xjh',
            })
        ).toEqual(stateTaskDelete);
    });

    test('all complete reducer', () => {
        expect(
            reducers(initialState, {
                type:    'TODOS_ALL_COMPLETE',
                payload: true,
            })
        ).toEqual(stateAllComplete);
    });

    test('reset reducer', () => {
        expect(
            reducers({}, {
                type:    'TODOS_RESET',
                payload: initialState,
            })
        ).toEqual(initialState);
    });

    test('default reducer by undefined type', () => {
        expect(reducers(initialState, { type: '___' })).toEqual(initialState);
    });

    test('default reducer by init state', () => {
        expect(reducers(undefined, { type: '___' })).toEqual(initialState);
    });
});
