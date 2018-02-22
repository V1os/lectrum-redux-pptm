// Core
import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { allCompleteWorker } from './';
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
    todos,
    task
} from 'mocks';

setup();

const params = { flag: task.favorite, todos };
const allCompleteAction = actions.allComplete(params);
const url = `${api}/`;
const saga = cloneableGenerator(allCompleteWorker)(allCompleteAction);

describe('allComplete saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:  tokenMock,
                },
                body: JSON.stringify(
                    todos.map((todo) => todo.set('completed', !task.favorite))
                ),
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

    test('should dispatch ALL_COMPLETE_SUCCESS action', () => {
        expect(saga.next(responseData).value).toEqual(
            put(actions.allCompleteSuccess(fromJS({ todos })))
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
