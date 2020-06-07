import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "rebass";

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
    <Box>
      {users.map((user) => (
        <UserPanel
          fetchRepositories={dispatchFetchRepositories}
          key={user.id}
          user={user}
        />
      ))}
    </Box>
  );
};
