import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import GeolocInput from "./GeolocInput";

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

export default function Header(){

  const classes = useStyles();

  return <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
    <Toolbar className={classes.toolbar}>
      <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
        <Link variant="button" color="textPrimary" href="/" className={classes.link}>Solidarity App</Link>
        <GeolocInput></GeolocInput>
      </Typography>
      <nav>
        <Link variant="button" color="textPrimary" href="/" className={classes.link}>
          Map
        </Link>
        <Link variant="button" color="textPrimary" href="/proposals" className={classes.link}>
          Proposals
        </Link>
        <Link variant="button" color="textPrimary" href="/requests" className={classes.link}>
          Requests
        </Link>
      </nav>
      <Button href="/login" color="primary" variant="outlined" className={classes.link}>
        Login
      </Button>
      <Button href="/register" color="primary" variant="outlined" className={classes.link}>
        Register
      </Button>
    </Toolbar>
  </AppBar>
}