// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* completeWorker ({ payload: todo }) {
    try {
        const response = yield call(fetch, `${api}/`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify(todo),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(actions.completeTaskSuccess(data[0].id));
    } catch (error) {
        yield put(actions.updateTaskFail(error.message));
    }
}
