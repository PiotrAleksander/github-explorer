// ducks

import { ActionsObservable } from "redux-observable";
import { filter, switchMap, map, debounceTime } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { combineReducers } from "redux";

import { isOfType } from "typesafe-actions";
import {
  UsersActionTypes,
  DomainAction,
  IFetchUsersFulfilledAction,
  IUser,
  IUserResponse,
  IUsersResponse,
  IDomainState,
} from "./types";

import { GITHUB_API_URL } from "./config";

// action creators
export const fetchUser = (username: string) => ({
  type: UsersActionTypes.FETCH_USERS,
  payload: username,
});

const fetchUserFulfilled = (
  users: Array<IUser>
): IFetchUsersFulfilledAction => ({
  type: UsersActionTypes.FETCH_USERS_FULFILLED,
  payload: {
    users,
  },
});

// mapper
const User = (userResponse: IUserResponse): IUser => ({
  id: userResponse.id,
  login: userResponse.login,
  avatarUrl: userResponse.avatar_url,
  reposUrl: userResponse.repos_url,
});

// epics
export const fetchUserEpic = (action$: ActionsObservable<DomainAction>) =>
  action$.pipe(
    filter(isOfType(UsersActionTypes.FETCH_USERS)),
    debounceTime(1000),
    switchMap((action) =>
      ajax
        .getJSON<IUsersResponse>(
          `${GITHUB_API_URL}search/users?q=${action.payload.username}&per_page=5`
        )
        .pipe(
          map((response: IUsersResponse) => response.items.map(User)),
          map((users) => fetchUserFulfilled(users))
        )
    )
  );

// reducers
const allIds = (state = [], action: DomainAction) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_FULFILLED:
      const ids = action.payload.users.map((user) => user.id);
      return [...state, ...ids];
    default:
      return state;
  }
};

const byId = (state = {}, action: DomainAction) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USERS_FULFILLED:
      const users = action.payload.users.map((user) => ({
        [user.id]: user,
      }));
      return {
        ...state,
        ...users,
      };
    default:
      return state;
  }
};

export const usersReducer = combineReducers({ allIds, byId });

// selectors

const users = (state: IDomainState) =>
  state.users.allIds.map((id) => state.users.byId[id]);
