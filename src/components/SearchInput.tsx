import React from "react";
import TextField from "@material-ui/core/TextField";

import { ISearchInputProps } from "types";

export default ({ onChange, username }: ISearchInputProps) => (
  <TextField
    fullWidth
    variant="filled"
    value={username}
    onChange={onChange}
    placeholder="Enter username"
  />
);
