// Core
import { createSelector } from 'reselect';
import { sortTaskByZA } from 'helpers';

export const sortByCompleted = createSelector(
    (state) => state,
    (state) =>
        state.update('todos', (todos) => sortTaskByZA(todos, 'completed')).toJS()
);
