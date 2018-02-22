// Instruments
import actions from './';

const task = {
    id:        'zkr',
    completed: false,
    favorite:  false,
    message:   'test message',
};

describe('Actions', () => {
    test('allComplete action', () => {
        expect(
            actions.allComplete({ flag: true, todos: [task]})
        ).toMatchSnapshot();
    });

    test('allComplete success action', () => {
        expect(actions.allCompleteSuccess([task])).toMatchSnapshot();
    });

    test('createTask action', () => {
        expect(actions.createTask(task.message)).toMatchSnapshot();
    });

    test('createTask success action', () => {
        expect(actions.createTaskSuccess([task])).toMatchSnapshot();
    });

    test('createTask fail action', () => {
        expect(actions.createTaskFail(task.message)).toMatchSnapshot();
    });

    test('deleteTask action', () => {
        expect(actions.deleteTask('zkr')).toMatchSnapshot();
    });

    test('deleteTask success action', () => {
        expect(actions.deleteTaskSuccess('zkr')).toMatchSnapshot();
    });

    test('deleteTask fail action', () => {
        expect(actions.deleteTaskFail(task.message)).toMatchSnapshot();
    });

    test('updateTask action', () => {
        expect(actions.updateTask([task])).toMatchSnapshot();
    });

    test('updateTask success action', () => {
        expect(actions.updateTaskSuccess([task])).toMatchSnapshot();
    });

    test('updateTask fail action', () => {
        expect(actions.updateTaskFail(task.message)).toMatchSnapshot();
    });

    test('searchTask action', () => {
        expect(actions.searchTask('test m')).toMatchSnapshot();
    });

    test('changePriority action', () => {
        expect(actions.changePriority([task])).toMatchSnapshot();
    });

    test('changePriority action', () => {
        expect(actions.changePrioritySuccess('zkr')).toMatchSnapshot();
    });

    test('completeTask action', () => {
        expect(actions.completeTask([task])).toMatchSnapshot();
    });

    test('completeTask action', () => {
        expect(actions.completeTaskSuccess('zkr')).toMatchSnapshot();
    });

    test('resetList action', () => {
        expect(actions.resetList({ actions: {}, todos: []})).toMatchSnapshot();
    });

    test('readTask action', () => {
        expect(actions.readTask()).toMatchSnapshot();
    });

    test('readTask success action', () => {
        expect(actions.readTaskSuccess([task])).toMatchSnapshot();
    });

    test('readTask fail action', () => {
        expect(actions.readTaskFail(task.message)).toMatchSnapshot();
    });
});
