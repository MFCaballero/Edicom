import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Drawer, AppBar, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import HomeIcon from '@material-ui/icons/Home';
import './SidebarUsers.css';
import useStyles from './useStyles';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getIdUser } from '../../redux/logging/loggingActions';
import { getUser } from '../../redux/users/userActions';
import BuildIcon from '@material-ui/icons/Build';
import ApartmentIcon from '@material-ui/icons/Apartment';

export default function Sidebar(props) {

    const currentUserData = useSelector(state => state.userReducer.userDetail);
    const userInfo = useSelector(state => state.loggingReducer.userId);
    const dispatch = useDispatch();
    const classes = useStyles(theme);
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    const [notiNumb, setNotiNumb] = useState(0);
    const [userToken, setUserToken] = useState('');
    const [userId, setUserId] = useState('');

    const { authData } = useSelector(state => {
        return {
            authData: state.loggingReducer.authData,
        };
    });

    const current = JSON.parse(localStorage.getItem('profile'))
    const userLogged = useSelector(state => state.userReducer.userDetail);
    const [currentUser, setCurrentUser] = useState(current);

    useEffect(() => {
        setCurrentUser(current)
    }, [authData])

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
                        <Link to={`/public/${currentUserData?.id}`}>
                            <h1 className="edicomLogoContainer">
                                <img src={`${window.location.origin}/assets/logo-Edicom-negative.png`} alt="Edicom" className="edicomLogo" />
                            </h1>
                        </Link>
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

                        <Link to={`/public/${userLogged?.id}`} className='link'>
                            <ListItem button key={'Amenities'} style={{ marginTop: '-20px' }} >
                                <ListItemIcon><HomeIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                                <ListItemText className='fontColor' primary={'Inicio'} />
                            </ListItem>
                        </Link>

                        <Link to={`/public/${currentUser.id}/calendar`} className='link'>
                            <ListItem button key={'Calendar'} style={{ marginTop: '-20px' }} >
                                <ListItemIcon><ApartmentIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                                <ListItemText className='fontColor' primary={'Mi Edificio'} />
                            </ListItem>
                        </Link>

                        <Link to={`/public/${currentUser.id}/Bookings`} className='link'>
                            <ListItem button key={'Amenities'} style={{ marginTop: '-20px' }} >
                                <ListItemIcon><OutdoorGrillIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                                <ListItemText className='fontColor' primary={'Amenities'} />
                            </ListItem>
                        </Link>

                        <Link to={`/public/expenses/${currentUserData?.apartmentId}/${currentUserData?.apartment?.number_apartment}`}>
                            <ListItem button key={'Expensas'}>
                                <ListItemIcon><MonetizationOnIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                                <ListItemText className='fontColor' primary={'Mis expensas'} />
                            </ListItem>
                        </Link>

                        <Link to={`/public/${currentUser.id}/complaints`}>
                            <ListItem button key={'Alertas'}>
                                <ListItemIcon><AnnouncementIcon style={{ color: "#00ff7f" }} /></ListItemIcon>
                                <ListItemText className='fontColor' primary={'Reclamos'} />
                            </ListItem>
                        </Link>

                        <Link to={`/public/contservices/${currentUser.id}`}>
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