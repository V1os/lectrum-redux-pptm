// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* updateWorker ({ payload: tasks }) {
    try {
        const response = yield call(fetch, `${api}/`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify(tasks),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(actions.updateTaskSuccess(data));
    } catch (error) {
        yield put(actions.updateTaskFail(error.message));
    }
}
