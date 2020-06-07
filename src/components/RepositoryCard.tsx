import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import StarIcon from "@material-ui/icons/Star";

import { IRepositoryCardProps } from "../types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    backgroundColor: "#E1DFE0",
    borderRadius: 0,
  },
  subHeader: {
    display: "flex",
    alignItems: "center",
  },
}));

export default ({
  repository: { name, description, stargazersCount },
}: IRepositoryCardProps) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        title={name}
        subheader={
          <div className={classes.subHeader}>
            <Typography>{stargazersCount}</Typography>
            <StarIcon />
          </div>
        }
      />
      <CardContent>
        <Typography>{description}</Typography>
      </CardContent>
    </Card>
  );
};
