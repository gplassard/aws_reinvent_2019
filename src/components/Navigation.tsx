import React from 'react';
import {AppBar, Toolbar, Typography, Menu, MenuItem} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import './Navigation.css';
import { auth } from '../services/FirebaseService';
import {User} from "firebase";
import Login from './dialogs/Login';

interface Props {
    loggedUser: User | null
}

const Navigation: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loginOpen, setLoginOpen] = React.useState(false);

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

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <Typography className="title">AWS-REINVENT-2019</Typography>
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
                    </Menu>
                </Toolbar>
            </AppBar>
            <Login open={loginOpen} onClose={loginClose}></Login>
        </React.Fragment>
    );
  };
  
export default Navigation;