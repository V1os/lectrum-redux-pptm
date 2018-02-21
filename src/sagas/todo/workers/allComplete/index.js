// Core
import { call, put } from 'redux-saga/effects';
import { fromJS } from 'immutable';

// Instruments
import actions from 'actions';
import { api, token } from 'helpers/api';

export function* allCompleteWorker ({ payload: params }) {
    try {
        const { flag, todos } = params;

        const response = yield call(fetch, `${api}/`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  token,
            },
            body: JSON.stringify(
                todos.map((todo) => todo.set('completed', !flag))
            ),
        });

        const { data, message } = yield call([response, response.json]);

        if (response.status !== 200) {
            throw new Error(message);
        }

        yield put(actions.allCompleteSuccess(fromJS({ todos: data })));
    } catch (error) {
        yield put(actions.updateTaskFail(error.message));
    }
}
