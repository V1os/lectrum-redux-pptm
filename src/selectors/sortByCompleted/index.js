// Core
import { createSelector } from 'reselect';
import { sortTaskByAZ } from 'helpers';

export const sortByCompleted = createSelector(
    (state) => state,
    (state) =>
        state.update('todos', (todos) =>
            sortTaskByAZ(todos, 'completed')
        ).toJS()
);
