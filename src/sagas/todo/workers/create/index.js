// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* createWorker ({ payload: message }) {
    try {
        const response = yield call(fetch, `${api}/`, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify({ message }),
        });

        const { data, message: responseMessage } = yield call([
            response,
            response.json
        ]);

        if (response.status !== 200) {
            throw new Error(responseMessage);
        }

        yield put(actions.createTaskSuccess(data));
    } catch (error) {
        yield put(actions.createTaskFail(error.message));
    }
}
