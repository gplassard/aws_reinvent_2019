import React from 'react';
import {AppBar, Toolbar, Typography, Menu, MenuItem} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './Navigation.scss';
import { auth } from '../services/FirebaseService';
import {User} from "firebase";
import Login from './dialogs/Login';
import PreferencesDialog from './dialogs/PreferencesDialog';
import { Preferences } from '../model';

interface Props {
    loggedUser: User | null
    preferences: Preferences
    updatePreferences: (preferences: Preferences) => Promise<void>
}

const Navigation: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loginOpen, setLoginOpen] = React.useState(false);
    const [preferencesOpen, setPreferencesOpen] = React.useState(false);

    function handleClick(event: any) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }
    
    async function login() {
        setLoginOpen(true);
        handleClose();
    }

    async function logout() {
        await auth.signOut();
        handleClose();
    }

    const notLoggedIn = [
        <MenuItem onClick={login} key="login">Login</MenuItem>,
    ]

    const loggedIn = [
        <MenuItem onClick={logout} key="logout">Logout</MenuItem>
    ]

    const loginClose = () => {
        setLoginOpen(false);
    }

    const preferencesClose = () => {
        setPreferencesOpen(false);
    }

    const openPreferences = () => {
        setPreferencesOpen(true);
    }

    return (
        <React.Fragment>
            <AppBar position="static" className="navigation">
                <Toolbar>
                    <Link to="/" className="title">
                        <Typography>REINVENT-2019-PLANNER</Typography>
                    </Link>
                    <Link to="/agenda" className="last-link">
                        <Typography>Agenda</Typography>
                    </Link>
                    {props.loggedUser ? <Typography >{props.loggedUser.displayName || props.loggedUser.uid}</Typography> : null}
                    <AccountCircle onClick={handleClick}></AccountCircle>
                    <Menu id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {
                            props.loggedUser === null ? notLoggedIn : loggedIn
                        }
                         <MenuItem onClick={openPreferences} key="preferences">Preferences</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Login open={loginOpen} onClose={loginClose}></Login>
            <PreferencesDialog open={preferencesOpen} onClose={preferencesClose} updatePreferences={props.updatePreferences} preferences={props.preferences}></PreferencesDialog>
        </React.Fragment>
    );
  };
  
export default Navigation;