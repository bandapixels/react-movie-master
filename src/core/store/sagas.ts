import { all, fork } from "redux-saga/effects";

import searchSagas from "../features/SearchContainer/searchContainer.sagas";

function* rootSaga(): Generator {
  yield all([fork(searchSagas)]);
}

export default rootSaga;
