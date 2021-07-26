import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ApartmentIcon from '@material-ui/icons/Apartment';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import HomeIcon from '@material-ui/icons/Home';
import ReceiptIcon from '@material-ui/icons/Receipt';
import GroupIcon from '@material-ui/icons/Group';
import './Sidebar.css';
import useStyles from './useStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import theme from '../themeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/logging/loggingActions';
import NotificationBar from "../NotificationBar/NotificationBar"
import { getComplaints , putSeenComplaint} from "../../redux/complaints/complaintsActions";
import { getUser } from '../../redux/users/userActions';
import ErrorIcon from '@material-ui/icons/Error';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BuildIcon from '@material-ui/icons/Build';






export default function Sidebar(props) {


  const Notifications = useSelector(state => state.complaintsReducer.allComplaints); //Use selector setup
  const currentUserData = useSelector(state => state.userReducer.userDetail)
  const dispatch = useDispatch();
  const classes = useStyles(theme);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [noti, setNoti] = useState(false);

  const history = useHistory();

  const [notiNumb, setNotiNumb] = useState(0);

  useEffect(() => {
    dispatch(getComplaints())
  }, [dispatch])

  useEffect(() => {
    dispatch(getUser(1))
}, [])

  useEffect(() => {
    setNotiNumb(Notifications?.filter(noti => { if (noti.seen === false) return true }).length)
  }, [Notifications])



  const { authData } = useSelector(state => {
    return {
        authData: state.loggingReducer.authData,
    };
  });

  const current = JSON.parse(localStorage.getItem('profile'))

  const [currentUser, setCurrentUser] = useState(current);

  useEffect(() => {
    setCurrentUser(current)
  }, [ authData ])




  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout({ type: "LOGOUT" }))
    setCurrentUser(null);
    window.location.href = 'http://localhost:3000/logging'
  }


  const notiHandler = () => {
    setNoti(!noti)
/*     if(notiNumb !== 0) setNotiNumb(notiNumb - 4); */
    let notis = Notifications.filter(noti => { if (noti.seen === false) return true });
    notis = notis.slice(notis.length - 4).map(noti => dispatch(putSeenComplaint(noti.id)))
    dispatch(getComplaints())
  }
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
          >
          <Toolbar className='navbar'>
          {noti ? <NotificationBar notifications={Notifications} id={classes.notiBox} quantity={notiNumb} /> : <div></div>}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon style={{ color: "#00ff7f" }} />
            </IconButton>
            <Typography variant="h6" noWrap>
              Panel Administrador
            </Typography>
          </Toolbar>
          <div className='login'>
            <Typography variant="h6" style={{ marginRight: 20 }}>
              {
                currentUser?.name
                ?
                `Sesión de ${currentUser?.name}`
                :
                false
              }
            </Typography>
            <Link className='btnNavbar' to='/'>
              <HomeIcon style={{ fontSize: 35, color: "#00ff7f" }} />
            </Link>
            <Link className='btnNavbar' to={noti}>
              <div onClick={notiHandler}>
                <Badge badgeContent={notiNumb} color="secondary">
                  {notiNumb === 0 ?
                    <ErrorOutlineIcon id="noti" style={{ fontSize: 35, color: "#00ff7f" }} /> :
                    <ErrorIcon id="noti" style={{ fontSize: 35, color: "#00ff7f" }} />
                  }
                </Badge>
              </div>
            </Link>
            <Button className='btnNavbar' aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              <AccountCircleIcon style={{ fontSize: 35, color: "#00ff7f" }} />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                currentUser?.name
                ?
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                :
                <Link className='btnNavbar' to='/logging'>
                  <MenuItem onClick={handleClose}>Login</MenuItem>
                </Link>
              }
            </Menu>
          </div>
        </AppBar>

        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}>

          <div className={classes.toolbar}>
            <IconButton style={{ color: "#00ff7f" }} onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />

          <List>
            <Link to="/buildings" className='link'>
              <ListItem button key={'Edificios'}>
                <ListItemIcon><ApartmentIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Edificios'} />
              </ListItem>
            </Link>

            <Link to="/amenities/" className='link'>
              <ListItem button key={'Amenities'} style={{ marginTop: '-20px' }} >
                <ListItemIcon><OutdoorGrillIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Amenities'} />
              </ListItem>
            </Link>

            <Link to='/spendings/board'>
              <ListItem button key={'Gastos'}>
                <ListItemIcon><MonetizationOnIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Gastos'} />
              </ListItem>
            </Link>

            <Link to='/alerts'>
              <ListItem button key={'Alertas'}>
                <ListItemIcon><AnnouncementIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Alertas'} />
              </ListItem>
            </Link>

            <Link to='/ExpensesTable'>
              <ListItem button key={'Expensas'}>
                <ListItemIcon><ReceiptIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Expensas'} />
              </ListItem>
            </Link>

            <Link to="/userDetail">
              <ListItem button key={'Expensas'}>
                <ListItemIcon><GroupIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Usuarios'} />
              </ListItem>
            </Link>

            <Link to="/services">
              <ListItem button key={'Servicios Utiles'}>
                <ListItemIcon><BuildIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                <ListItemText className='fontColor' primary={'Servicios Utiles'} />
              </ListItem>
            </Link>

          </List>
        </Drawer>

      </div>
    </ThemeProvider>
  );
}