import React, { useState } from "react";
import { IUser } from "../domain/types";
import { Button, Flex, Box, Image } from "rebass";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import RepositoriesList from "containers/RepositoriesList";

export default (user: IUser) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const toggleIsPanelOpen = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <Flex onClick={toggleIsPanelOpen} mx={-2}>
      <Box>
        <Image src={user.avatarUrl} />
        <Button>{user.login}</Button>
        {isPanelOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </Box>
      <Box>{isPanelOpen && <RepositoriesList userId={user.id} />}</Box>
    </Flex>
  );
};
