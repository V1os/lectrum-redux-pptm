// Instruments
import actions from './';
import { getUniqueID } from '../helpers';

const task = {
    id:        'zkr',
    completed: false,
    important: false,
    message:   'test message',
};

describe('Actions', () => {
    test('allComplete action', () => {
        expect(actions.allComplete(true)).toMatchSnapshot();
    });

    test('addTask action', () => {
        expect(actions.addTask(task)).toMatchSnapshot();
    });

    test('deleteTask action', () => {
        expect(actions.deleteTask('zkr')).toMatchSnapshot();
    });

    test('updateTask action', () => {
        expect(actions.updateTask(task)).toMatchSnapshot();
    });

    test('searchTask action', () => {
        expect(actions.searchTask('test')).toMatchSnapshot();
    });

    test('changePriority action', () => {
        expect(actions.changePriority('zkr')).toMatchSnapshot();
    });

    test('updateComplete action', () => {
        expect(actions.updateComplete('zkr')).toMatchSnapshot();
    });

    test('resetList action', () => {
        expect(actions.resetList({ actions: {}, todos: []})).toMatchSnapshot();
    });
});
