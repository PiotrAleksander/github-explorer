import React from "react";
import { useSelector } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { IRepositoriesListProps } from "types";
import { userRepositoriesSelector } from "domain/repositories";
import { IDomainState } from "domain/types";
import RepositoryCard from "components/RepositoryCard";

export default ({ userId }: IRepositoriesListProps) => {
  const repositories = useSelector((state: IDomainState) =>
    userRepositoriesSelector(state, userId)
  );

  return (
    <List>
      {repositories &&
        repositories.map((repository) => (
          <ListItem key={repository.id}>
            <RepositoryCard repository={repository} />
          </ListItem>
        ))}
    </List>
  );
};
