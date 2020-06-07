import React, { useState } from "react";
import { Button, Flex, Box, Image } from "rebass";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";

import RepositoriesList from "containers/RepositoriesList";
import { IUserPanelProps } from "types";

export default ({ user, fetchRepositories }: IUserPanelProps) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const toggleIsPanelOpen = () => {
    if (!isPanelOpen) fetchRepositories(user.id, user.reposUrl);
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <Flex onClick={toggleIsPanelOpen} mx={-2}>
      <Box>
        <Image
          sx={{
            width: 48,
            height: 48,
            borderRadius: 9999,
          }}
          src={user.avatarUrl}
        />
        <Button>{user.login}</Button>
        {isPanelOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Box>
      <Box>{isPanelOpen && <RepositoriesList userId={user.id} />}</Box>
    </Flex>
  );
};
