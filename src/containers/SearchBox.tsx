import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { Box, Text } from "rebass";

import SearchInput from "components/SearchInput";
import SearchButton from "components/SearchButton";
import { fetchUsers } from "domain/users";

export default () => {
  const [username, setUsername] = useState("");
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const dispatch = useDispatch();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsDescriptionVisible(false);
    const username = event.target.value;
    setUsername(username);
  };

  const onClick = () => {
    if (username) dispatch(fetchUsers(username));
    setIsDescriptionVisible(true);
  };

  return (
    <Box p={5}>
      <SearchInput username={username} onChange={onChange} />
      <SearchButton onClick={onClick} />
      {isDescriptionVisible && <Text>Showing users for "{username}"</Text>}
    </Box>
  );
};
