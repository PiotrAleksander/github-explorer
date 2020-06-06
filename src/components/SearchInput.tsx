import React from "react";
import { Box } from "rebass";
import { ISearchInputProps } from "types";

export default ({ onChange, username }: ISearchInputProps) => (
  <Box>
    <input
      value={username}
      onChange={onChange}
      type="text"
      placeholder="Enter username"
    />
  </Box>
);
