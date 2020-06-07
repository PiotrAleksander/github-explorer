import React, { useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import SearchInput from "components/SearchInput";
import SearchButton from "components/SearchButton";
import { fetchUsers } from "domain/users";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default () => {
  const classes = useStyles();
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
    <div className={classes.root}>
      <Grid container justify="center" spacing={1}>
        <Grid item xs={12}>
          <SearchInput username={username} onChange={onChange} />
        </Grid>
        <Grid item xs={12}>
          <SearchButton onClick={onClick}>
            <Typography>Search</Typography>
          </SearchButton>
        </Grid>
        <Grid item xs={12}>
          {isDescriptionVisible && (
            <Typography>Showing users for "{username}"</Typography>
          )}
        </Grid>
      </Grid>
    </div>
  );
};
