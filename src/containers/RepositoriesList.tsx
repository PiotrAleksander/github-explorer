import React from "react";
import { useSelector } from "react-redux";
import { Box } from "rebass";

import { IRepositoriesListProps } from "types";
import { userRepositoriesSelector } from "domain/repositories";
import { IDomainState } from "domain/types";
import RepositoryCard from "components/RepositoryCard";

export default ({ userId }: IRepositoriesListProps) => {
  const repositories = useSelector((state: IDomainState) =>
    userRepositoriesSelector(state, userId)
  );

  console.log(repositories);

  return (
    <Box>
      {repositories &&
        repositories.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
    </Box>
  );
};
