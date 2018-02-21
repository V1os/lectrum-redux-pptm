// Core
import { createSelector } from 'reselect';
import { sortTaskByAZ } from 'helpers';

export const sortByPriority = createSelector(
    (state) => state,
    (state) => state.update('todos', (todos) => sortTaskByAZ(todos, 'favorite'))
);
