// Core
import { takeEvery } from 'redux-saga/effects';

// Instrument
import types from 'actions/types';
import { readWorker } from './workers/read';
import { createWorker } from './workers/create';
import { updateWorker } from './workers/update';
import { deleteWorker } from './workers/delete';
import { completeWorker } from './workers/complete';
import { allCompleteWorker } from './workers/allComplete';
import { changePriorityWorker } from './workers/changePriority';

export default {
    * createWatcher () {
        yield takeEvery(types.CREATE_TASK, createWorker);
    },
    * readWatcher () {
        yield takeEvery(types.READ_TASK, readWorker);
    },
    * updateWatcher () {
        yield takeEvery(types.UPDATE_TASK, updateWorker);
    },
    * deleteWatcher () {
        yield takeEvery(types.DELETE_TASK, deleteWorker);
    },
    * allCompleteWatcher () {
        yield takeEvery(types.ALL_COMPLETE, allCompleteWorker);
    },
    * changePriorityWatcher () {
        yield takeEvery(types.CHANGE_PRIORITY, changePriorityWorker);
    },
    * completeWatcher () {
        yield takeEvery(types.COMPLETE_TASK, completeWorker);
    },
};
