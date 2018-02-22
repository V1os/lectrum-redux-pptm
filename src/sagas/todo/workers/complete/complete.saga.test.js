// Core
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { completeWorker } from './';
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
    todos
} from 'mocks';

setup();

const completeTaskAction = actions.completeTask(todos);
const url = `${api}/`;
const saga = cloneableGenerator(completeWorker)(completeTaskAction);

describe('completeTask saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  tokenMock,
                },
                body: JSON.stringify(todos),
            })
        );
    });

    test('should saga !== 200 response status', () => {
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

    test('should dispatch COMPLETE_TASK_SUCCESS action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(
                actions.completeTaskSuccess(
                    responseData.data.getIn(['todos', 0]).get('id')
                )
            )
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
