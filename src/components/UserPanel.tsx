import React, { useState, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import RepositoriesList from "containers/RepositoriesList";
import { IUserPanelProps } from "types";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
  },
  expansionPanel: {
    borderRadius: 0,
    backgroundColor: "#F2F2F2",
  },
}));

export default ({ user, fetchRepositories }: IUserPanelProps) => {
  const classes = useStyles();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const toggleIsPanelOpen = (_event: ChangeEvent<{}>, isExpanded: boolean) => {
    if (isExpanded) fetchRepositories(user.id, user.reposUrl);
    setIsPanelOpen(isExpanded);
  };

  return (
    <div className={classes.root}>
      <ExpansionPanel
        elevation={0}
        className={classes.expansionPanel}
        expanded={isPanelOpen}
        onChange={toggleIsPanelOpen}
      >
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{user.login}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <RepositoriesList userId={user.id} />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
