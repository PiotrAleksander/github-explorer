import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

import { usersSelector } from "domain/users";
import UserPanel from "components/UserPanel";
import { fetchRepositories } from "domain/repositories";

export default () => {
  const users = useSelector(usersSelector);
  const dispatch = useDispatch();
  const dispatchFetchRepositories = useCallback(
    (userId: number, repoUrl: string) =>
      dispatch(fetchRepositories(userId, repoUrl)),
    [dispatch]
  );

  return (
    <List>
      {users.map((user) => (
        <ListItem key={user.id}>
          <UserPanel
            fetchRepositories={dispatchFetchRepositories}
            user={user}
          />
        </ListItem>
      ))}
    </List>
  );
};
