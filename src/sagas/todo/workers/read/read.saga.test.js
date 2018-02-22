// Core
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { readWorker } from './';
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
    todos
} from 'mocks';

setup();

const readAction = actions.readTask();
const url = `${api}`;
const saga = cloneableGenerator(readWorker)(readAction);

describe('readTask saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'GET',
                headers: {
                    Authorization: tokenMock,
                },
            })
        );
    });

    test('should saga !== 204 response status', () => {
        const clone = saga.clone();

        expect(clone.next(responseFail).value).toEqual(
            call([responseFail, responseFail.json])
        );
        expect(clone.next(responseDataFail).value).toEqual(
            put(actions.readTaskFail(error.message))
        );
    });

    test('should valid response', () => {
        expect(saga.next(response).value).toEqual(
            call([response, response.json])
        );
    });

    test('should dispatch READ_TASK_SUCCESS action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(actions.readTaskSuccess({ todos }))
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
