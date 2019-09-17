import { Dialog, DialogContent, Tabs, Tab, TextField, Button, FormControl, Box } from "@material-ui/core";
import React from 'react';
import TabPanel from "../utils/TabPanel";
import "./Login.scss";
import { auth, googleProvider } from "../../services/FirebaseService";

interface Props {
    open: boolean
    onClose: (auth?: firebase.auth.UserCredential) => any
}


const Login: React.FC<Props> = (props: Props) => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState<any | null>(null);

    function panelChange(event: any, newValue: number) {
        setError(null);
        setTabIndex(newValue);
    }
     
    async function loginAnonymous() {
        try {
            const cred = await auth.signInAnonymously();
            props.onClose(cred);
        } catch (error) {
            setError(error);
        }
    }

    async function loginGoogle() {
        try {
            const cred = await auth.signInWithPopup(googleProvider);
            props.onClose(cred);
        } catch (error) {
            setError(error);
        }
    }

    async function loginEmail() {
        try {
            const cred = await auth.signInWithEmailAndPassword(email, password);
            props.onClose(cred);
        } catch (error) {
            setError(error);
        }
    }

    async function createAccount() {
        try {
            const cred = await auth.createUserWithEmailAndPassword(email, password);
            props.onClose(cred);
        } catch (error) {
            setError(error);
        }
    }

    async function handleClose() {
        props.onClose();
    }

    return (
        <Dialog open={props.open} onClose={handleClose} fullWidth>
            <DialogContent className="login-dialog">
                <Tabs value={tabIndex} onChange={panelChange}>
                    <Tab label="Login"/>
                    <Tab label="Sign In"/>
                </Tabs>
                <TabPanel active={tabIndex} index={0}>
                    <FormControl fullWidth className="login-form" onSubmit={loginEmail}>
                        <TextField id="email" label="Email" required autoFocus fullWidth onChange={e => setEmail(e.target.value)}></TextField>
                        <TextField id="password" label="Password" required autoFocus fullWidth type="password" onChange={e => setPassword(e.target.value)}></TextField>
                        {/* <Typography><Box color="text.hint" textAlign="right">Forgotten password</Box></Typography> */}
                        { error && error.message ? <Box color="error.main">{error.message}</Box> : null}
                        <Button variant="contained" color="primary" onClick={loginEmail}>Submit</Button>
                        <div className="alternative-login">
                            <Button onClick={loginAnonymous}>Anonymous</Button>
                            <Button onClick={loginGoogle}>Google</Button>
                        </div>
                    </FormControl>
                </TabPanel>
                <TabPanel active={tabIndex} index={1}>
                    <FormControl fullWidth className="login-form" onSubmit={createAccount}>
                        <TextField id="email" label="Email" required autoFocus fullWidth onChange={e => setEmail(e.target.value)}></TextField>
                        <TextField id="password" label="Password" required autoFocus fullWidth type="password" onChange={e => setPassword(e.target.value)}></TextField>
                        { error && error.message ? <Box color="error.main">{error.message}</Box> : null}
                        <Button variant="contained" color="primary" onClick={createAccount}>Create account</Button>
                    </FormControl>
            </TabPanel>
            </DialogContent>
           
        </Dialog>
    );
  };
  
export default Login;