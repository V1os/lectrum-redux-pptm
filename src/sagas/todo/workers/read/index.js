// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* readWorker () {
    try {
        const response = yield call(fetch, `${api}`, {
            method:  'GET',
            headers: {
                Authorization: token,
            },
        });

        const { data, message /*, meta*/ } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(actions.readTaskSuccess({ todos: data }));
    } catch (error) {
        yield put(actions.readTaskFail(error.message));
    }
}
