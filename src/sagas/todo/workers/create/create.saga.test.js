// Core
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { createWorker } from './';
import actions from 'actions';
import { api } from 'helpers/api';

import {
    token as tokenMock,
    setup,
    response,
    responseDataFail,
    responseData,
    responseFail,
    error,
    task
} from 'mocks';

setup();

const createTaskAction = actions.createTask(task.message);
const url = `${api}/`;
const saga = cloneableGenerator(createWorker)(createTaskAction);

describe('createTask saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  tokenMock,
                },
                body: JSON.stringify({ message: task.message }),
            })
        );
    });

    test('should saga !== 200 response status', () => {
        const clone = saga.clone();

        expect(clone.next(responseFail).value).toEqual(
            call([responseFail, responseFail.json])
        );
        expect(clone.next(responseDataFail).value).toEqual(
            put(actions.createTaskFail(error.message))
        );
    });

    test('should valid response', () => {
        expect(saga.next(response).value).toEqual(
            call([response, response.json])
        );
    });

    test('should dispatch ALL_COMPLETE_SUCCESS action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(actions.createTaskSuccess(responseData.data))
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
