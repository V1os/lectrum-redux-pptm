// Core
import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

// Instruments
import { deleteWorker } from './';
import actions from 'actions';
import { api } from 'helpers/api';

import {
    token as tokenMock,
    setup,
    responseDataFail,
    responseNoConnect,
    responseFail,
    error,
    task
} from 'mocks';

setup();

const deleteTaskAction = actions.deleteTask(task.id);
const url = `${api}/${task.id}`;
const saga = cloneableGenerator(deleteWorker)(deleteTaskAction);

describe('deleteTask saga: ', () => {
    test(`should call a 'fetch' request`, () => {
        expect(saga.next().value).toEqual(
            call(fetch, url, {
                method:  'DELETE',
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
            put(actions.deleteTaskFail(error.message))
        );
    });

    test('should valid response', () => {
        expect(saga.next(responseNoConnect).value).toEqual(
            call([responseNoConnect, responseNoConnect.json])
        );
    });

    test('should dispatch DELETE_TASK_SUCCESS action', () => {
        expect(saga.next(responseNoConnect).value).toEqual(
            put(actions.deleteTaskSuccess(task.id))
        );
    });

    test('should be completed', () => {
        expect(saga.next().done).toBe(true);
    });
});
