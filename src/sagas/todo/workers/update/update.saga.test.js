// Core
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { updateWorker } from './';
import actions from 'actions';
import { api } from 'helpers/api';

import {
    token as tokenMock,
    setup,
    response,
    responseDataFail,
    responseFail,
    responseData,
    error,
    task,
    todos
} from 'mocks';

setup();

const updateAction = actions.updateTask(task);
const url = `${api}/`;
const saga = cloneableGenerator(updateWorker)(updateAction);

describe('updateTask saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  tokenMock,
                },
                body: JSON.stringify(task),
            })
        );
    });

    test('should saga !== 204 response status', () => {
        const clone = saga.clone();

        expect(clone.next(responseFail).value).toEqual(
            call([responseFail, responseFail.json])
        );
        expect(clone.next(responseDataFail).value).toEqual(
            put(actions.updateTaskFail(error.message))
        );
    });

    test('should valid response', () => {
        expect(saga.next(response).value).toEqual(
            call([response, response.json])
        );
    });

    test('should dispatch UPDATE_TASK_SUCCESS action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(actions.updateTaskSuccess(todos))
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
