import {
  combineReducers,
  createStore as createReduxStore,
  applyMiddleware,
} from "redux";
import { combineEpics, createEpicMiddleware } from "redux-observable";

import { usersReducer, fetchUsersEpic } from "./users";
import { repositoriesReducer, fetchRepositoriesEpic } from "./repositories";

const rootReducer = combineReducers({
  users: usersReducer,
  repositories: repositoriesReducer,
});

const rootEpic = combineEpics(fetchUsersEpic, fetchRepositoriesEpic);
const epicMiddleware = createEpicMiddleware();

const createStore = () => {
  const store = createReduxStore(rootReducer, applyMiddleware(epicMiddleware));
  epicMiddleware.run(rootEpic);
  return store;
};

export default createStore;
