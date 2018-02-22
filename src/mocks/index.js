/* global jest */
import { fromJS } from 'immutable';

export const token = '6SYsWT1Teibd7m3W';
export const successMessage = 'The request has been successful';
export const errorMessage = 'Error';
export const error = new Error(errorMessage);
export const task = {
    id:        'xjh',
    message:   'Успешно пройти React-интенсив компании Lectrum',
    completed: true,
    favorite:  true,
};
export const todos = fromJS({ todos: [task]});

export const responseData = {
    data:    todos,
    message: successMessage,
};

export const responseDataMessage = {
    message: successMessage,
};

export const responseDataFail = {
    message: errorMessage,
};

export const response = {
    status: 200,
    json:   () => new Promise.resolve(responseData),
};

export const responseNoConnect = {
    status: 204,
    json:   () => new Promise.resolve(responseDataMessage),
};

export const responseFail = {
    status: 401,
    json:   () => new Promise.resolve(responseDataFail),
};

export const setup = () => {
    /* eslint-env node */
    global.fetch = jest.fn(() => new Promise.resolve(response));
    global.localStorage = (() => {
        let storage = {};

        return {
            setItem: jest.fn((key, value) => {
                storage[key] = value;
            }),
            getItem:    jest.fn((key) => storage[key]),
            removeItem: jest.fn((key) => {
                delete storage[key];
            }),
            clear: jest.fn(() => storage = {}),
        };
    })();
};
