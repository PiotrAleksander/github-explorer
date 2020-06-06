import React, { useState, ChangeEvent } from "react";
import { Box } from "rebass";

import SearchInput from "components/SearchInput";
import SearchButton from "components/SearchButton";
import { fetchUser } from "domain/users";

export default () => {
  const [username, setUsername] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const username = event.target.value;
    setUsername(username);
  };

  const onClick = () => {
    if (username) fetchUser(username);
  };

  return (
    <Box>
      <SearchInput username={username} onChange={onChange} />
      <SearchButton onClick={onClick} />
    </Box>
  );
};
