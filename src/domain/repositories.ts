// ducks

import { ActionsObservable } from "redux-observable";
import { filter, map, switchMap } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineReducers } from "redux";

import { isOfType } from "typesafe-actions";
import {
  RepositoriesActionTypes,
  DomainAction,
  IFetchRepositoriesFulfilledAction,
  IRepository,
  IRepositoryResponse,
} from "./types";

// action creators
export const fetchRepository = (repositoryname: string) => ({
  type: RepositoriesActionTypes.FETCH_REPOSITORIES,
  payload: repositoryname,
});

const fetchRepositoryFulfilled = (
  repositories: Array<IRepository>
): IFetchRepositoriesFulfilledAction => ({
  type: RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED,
  payload: {
    repositories,
  },
});

// mapper
const Repository = (repositoryResponse: IRepositoryResponse): IRepository => ({
  id: repositoryResponse.id,
  name: repositoryResponse.name,
  description: repositoryResponse.description,
  htmlUrl: repositoryResponse.html_url,
  stargazersCount: repositoryResponse.stargazers_count,
});

// epics
export const fetchRepositoryEpic = (action$: ActionsObservable<DomainAction>) =>
  action$.pipe(
    filter(isOfType(RepositoriesActionTypes.FETCH_REPOSITORIES)),
    switchMap((action) =>
      ajax.getJSON<Array<IRepositoryResponse>>(action.payload.reposUrl).pipe(
        map((response: Array<IRepositoryResponse>) => response.map(Repository)),
        map((repositories) => fetchRepositoryFulfilled(repositories))
      )
    )
  );

// reducers
const allIds = (state = [], action: DomainAction) => {
  switch (action.type) {
    case RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED:
      const ids = action.payload.repositories.map(
        (repository) => repository.id
      );
      return [...state, ...ids];
    default:
      return state;
  }
};

const byId = (state = {}, action: DomainAction) => {
  switch (action.type) {
    case RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED:
      const repositories = action.payload.repositories.map((repository) => ({
        [repository.id]: repository,
      }));
      return {
        ...state,
        ...repositories,
      };
    default:
      return state;
  }
};

export const repositoriesReducer = combineReducers({ allIds, byId });
