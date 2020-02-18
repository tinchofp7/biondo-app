import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, Tab, Paper} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function IconLabelTabs() {
  const classes = useStyles();
  const [value, setValue] = useState(0);  

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<HomeIcon />} label="INICIO" />
        <Tab icon={<TurnedInIcon />} label="TURNOS" />
        <Tab icon={<AccountBoxIcon />} label="CUENTA" />
      </Tabs>
    </Paper>
  );
}