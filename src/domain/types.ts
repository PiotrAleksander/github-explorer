export enum UsersActionTypes {
  FETCH_USERS = "users/FETCH_USERS",
  FETCH_USERS_FULFILLED = "users/FETCH_USERS_FULFILLED",
}

export interface IUserResponse {
  id: number;
  login: string;
  avatar_url: string;
  repos_url: string;
}

export interface IUsersResponse {
  items: Array<IUserResponse>;
}

export interface IUser {
  id: number;
  login: string;
  avatarUrl: string;
  reposUrl: string;
}

export interface IFetchUsersAction {
  type: UsersActionTypes.FETCH_USERS;
  payload: {
    username: string;
  };
}

export interface IFetchUsersFulfilledAction {
  type: UsersActionTypes.FETCH_USERS_FULFILLED;
  payload: {
    users: Array<IUser>;
  };
}

export type UsersAction = IFetchUsersAction | IFetchUsersFulfilledAction;

interface IUsersState {
  byId: {
    [key: number]: IUser;
  };
  allIds: Array<number>;
}

export enum RepositoriesActionTypes {
  FETCH_REPOSITORIES = "users/FETCH_REPOSITORIES",
  FETCH_REPOSITORIES_FULFILLED = "users/FETCH_REPOSITORIES_FULFILLED",
}

export interface IRepositoryResponse {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  owner: {
    id: number;
  };
}

export interface IRepository {
  id: number;
  userId: number;
  name: string;
  description: string;
  stargazersCount: number;
}

export interface IFetchRepositoriesAction {
  type: RepositoriesActionTypes.FETCH_REPOSITORIES;
  payload: {
    userId: number;
    reposUrl: string;
  };
}

export interface IFetchRepositoriesFulfilledAction {
  type: RepositoriesActionTypes.FETCH_REPOSITORIES_FULFILLED;
  payload: {
    userId: number;
    repositories: Array<IRepository>;
  };
}

export type RepositoriesAction =
  | IFetchRepositoriesAction
  | IFetchRepositoriesFulfilledAction;

interface IRepositoriesState {
  byId: {
    [key: number]: Array<IRepository>;
  };
  allIds: Array<number>;
}

export interface IDomainState {
  users: IUsersState;
  repositories: IRepositoriesState;
}

export type DomainAction = UsersAction | RepositoriesAction;
