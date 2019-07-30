import React from 'react';
import {AppBar, Toolbar, Typography, Menu, MenuItem} from "@material-ui/core";
import { AccountCircle } from '@material-ui/icons';
import './Navigation.css';
import { auth } from '../services/FirebaseService';
import {User} from "firebase";

interface Props {
    loggedUser: User | null
}

const Navigation: React.FC<Props> = (props: Props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    function handleClick(event: any) {
      setAnchorEl(event.currentTarget);
    }
  
    function handleClose() {
      setAnchorEl(null);
    }

    async function login() {
        await auth.signInAnonymously();
        handleClose();
    }

    async function logout() {
        await auth.signOut();
        handleClose();
    }
  
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography className="title">AWS-REINVENT-2019</Typography>
                {props.loggedUser ? <Typography >{props.loggedUser.uid}</Typography> : null}
                <AccountCircle onClick={handleClick}></AccountCircle>
                <Menu id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {
                        props.loggedUser === null ?
                            <MenuItem onClick={login}>Login</MenuItem> :
                            <MenuItem onClick={logout}>Logout</MenuItem>
                    }
                </Menu>
            </Toolbar>
        </AppBar>
    );
  };
  
export default Navigation;