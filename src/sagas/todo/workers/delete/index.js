// Core
import { call, put } from 'redux-saga/effects';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* deleteWorker ({ payload: id }) {
    try {
        const response = yield call(fetch, `${api}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: token,
            },
        });
        let message = '';

        try {
            const { message: mess } = yield call([response, response.json]);

            message = mess;
        } catch (errorParseJSONEmptyLine) {
            message = errorParseJSONEmptyLine.message;
        }

        if (response.status !== 204) {
            throw new Error(message);
        }

        yield put(actions.deleteTaskSuccess(id));
    } catch (error) {
        yield put(actions.deleteTaskFail(error.message));
    }
}
