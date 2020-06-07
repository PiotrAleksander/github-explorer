import { ReactNode, MouseEvent as ReactMouseEvent, ChangeEvent } from "react";

import { IRepository, IUser } from "./domain/types";

export interface IThemeProviderProps {
  children: ReactNode;
}

export interface IStateProviderProps {
  children: ReactNode;
}

export interface IRepositoryCardProps {
  repository: IRepository;
}

export interface ISearchButtonProps {
  onClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export interface ISearchInputProps {
  username: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface IRepositoriesListProps {
  userId: number;
}

export interface IUserPanelProps {
  user: IUser;
  fetchRepositories: Function;
}
