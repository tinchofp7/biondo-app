import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Divider, IconButton,
ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Avatar from '@material-ui/core/Avatar';
import InfoIcon from '@material-ui/icons/Info';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import HistoryIcon from '@material-ui/icons/History';


import firebase from './firebase'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentBiondo: {
    flexGrow: 1,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  async function logout() {
    await firebase.logout()
    props.history.push('/login')
  }
  
  const userPhoto = ()=>{
    if(firebase.isInitialized()){
      return firebase.getCurrentUserPhoto();
    }
  }

  const obtenerLink = (index)=>{
    switch (index) {
      case 0:
        return "https://www.facebook.com/pg/biondobarberialp/about/"
      case 1:
        return "https://www.google.com/maps/dir//biondo+peluqueria+la+plata/@-34.9190624,-57.9690593,13.75z/data=!4m9!4m8!1m1!4e2!1m5!1m1!1s0x95a2e624ae2b012f:0x4220365739a0261e!2m2!1d-57.945293!2d-34.9179271"
      case 2:
      case 3:
      case 4:
        return "#"
      default:
        return "#"
    }
  }

  const obtenerIcono = (index)=>{
    switch (index) {
      case 0:
        return <InfoIcon/>
      case 1:
        return <LocationOnIcon/>
      case 2:
        return <AccountBoxIcon/>
      case 3:
        return <TurnedInIcon/>
      case 4:
        return <HistoryIcon/>
      default:
        return <AccountBoxIcon/>
    }
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.contentBiondo}>
            <Link href="/" color="inherit"> 
              BiondoApp
            </Link> 
          </Typography>
          <Avatar alt="Remy Sharp" src={userPhoto()} />
          <IconButton key="icc" onClick={() => logout()}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Quienes somos', 'Cómo llegar', 'Perfil', 'Turnos', 'Historial'].map((text, index) => (
            <Link href={obtenerLink(index)} target="_blank" rel="noopener">           
            <ListItem button key={text}>
              <ListItemIcon>{obtenerIcono(index)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>
    </div>
  );
}