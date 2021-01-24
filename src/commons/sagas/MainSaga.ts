import { SagaIterator } from 'redux-saga';
import { fork } from 'redux-saga/effects';

import PersistenceSaga from './PersistenceSaga';
import PlaygroundSaga from './PlaygroundSaga';
import WorkspaceSaga from './WorkspaceSaga';

export default function* MainSaga(): SagaIterator {
  yield fork(PlaygroundSaga);
  yield fork(WorkspaceSaga);
  yield fork(PersistenceSaga);
}
