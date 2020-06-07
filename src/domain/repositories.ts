// ducks

import { ActionsObservable } from "redux-observable";
import { filter, map, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineReducers } from "redux";
import { createSelector } from "reselect";

import { isOfType } from "typesafe-actions";
import {
  RepositoriesActionTypes,
  DomainAction,
  IFetchRepositoriesFulfilledAction,
  IRepository,
  IRepositoryResponse,
  IDomainState,
} from "./types";

// action creators
export const fetchRepositories = (userId: number, reposUrl: string) => ({
  type: RepositoriesActionTypes.FETCH_REPOSITORIES,
  payload: {
    userId,
    reposUrl,
  },
});

const fetchRepositoriesFulfilled = (
  userId: number,
  repositories: Array<IRepository>
): IFetchRepositoriesFulfilledAction => ({
  type: RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED,
  payload: {
    userId,
    repositories,
  },
});

// mapper
const Repository = (repositoryResponse: IRepositoryResponse): IRepository => ({
  id: repositoryResponse.id,
  userId: repositoryResponse.owner.id,
  name: repositoryResponse.name,
  description: repositoryResponse.description,
  stargazersCount: repositoryResponse.stargazers_count,
});

// epics
export const fetchRepositoriesEpic = (
  action$: ActionsObservable<DomainAction>
) =>
  action$.pipe(
    filter(isOfType(RepositoriesActionTypes.FETCH_REPOSITORIES)),
    switchMap((action) =>
      ajax.getJSON<Array<IRepositoryResponse>>(action.payload.reposUrl).pipe(
        map((response: Array<IRepositoryResponse>) => response.map(Repository)),
        map((repositories) =>
          fetchRepositoriesFulfilled(action.payload.userId, repositories)
        )
      )
    )
  );

// reducers
const allIds = (state = [], action: DomainAction) => {
  switch (action.type) {
    case RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED:
      const set = new Set([...state, action.payload.userId]);
      return [...set];
    default:
      return state;
  }
};

const byId = (state = {}, action: DomainAction) => {
  switch (action.type) {
    case RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED:
      return {
        ...state,
        [action.payload.userId]: action.payload.repositories,
      };
    default:
      return state;
  }
};

export const repositoriesReducer = combineReducers({ allIds, byId });

// selectors

const repositoriesSelector = (state: IDomainState) => state.repositories.byId;

const userIdSelector = (_state: IDomainState, userId: number) => userId;

export const userRepositoriesSelector = createSelector(
  [repositoriesSelector, userIdSelector],
  (repositories, userId) => {
    return repositories[userId];
  }
);
