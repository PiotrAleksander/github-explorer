import React from "react";
import Button from "@material-ui/core/Button";
import { ISearchButtonProps } from "types";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    border: "1px solid",
    borderRadius: 0,
    backgroundColor: "#2D9CDB",
    width: "100%",
  },
}));

export default (props: ISearchButtonProps) => {
  const classes = useStyles();

  return (
    <Button
      className={classes.root}
      disableElevation
      variant="contained"
      color="primary"
      {...props}
    />
  );
};
