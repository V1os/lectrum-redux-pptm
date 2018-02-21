//Core
import { all } from 'redux-saga/effects';

// Instrument
import todo from './todo';

export function* saga () {
    yield all([
        todo.readWatcher(),
        todo.createWatcher(),
        todo.updateWatcher(),
        todo.deleteWatcher(),
        todo.completeWatcher(),
        todo.allCompleteWatcher(),
        todo.changePriorityWatcher()
    ]);
}
