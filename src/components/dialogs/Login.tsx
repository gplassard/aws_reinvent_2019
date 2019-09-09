import { Dialog, DialogContent, Tabs, Tab, TextField, Button, FormControl } from "@material-ui/core";
import React from 'react';
import TabPanel from "../utils/TabPanel";
import "./Login.scss";
import { auth, googleProvider } from "../../services/FirebaseService";

interface Props {
    open: boolean
    onClose: (auth: firebase.auth.UserCredential) => any
}


const Login: React.FC<Props> = (props: Props) => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function panelChange(event: any, newValue: number) {
        setTabIndex(newValue);
    }
     
    async function loginAnonymous() {
        const cred = await auth.signInAnonymously();
        props.onClose(cred);
    }

    async function loginGoogle() {
        const cred = await auth.signInWithPopup(googleProvider);
        props.onClose(cred);
    }

    async function loginEmail() {
        const cred = await auth.signInWithEmailAndPassword(email, password);
        props.onClose(cred);
    }

    async function createAccount() {
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        props.onClose(cred);
    }

    return (
        <Dialog open={props.open || true} fullWidth>
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
                        <Button variant="contained" color="primary" onClick={createAccount}>Create account</Button>
                    </FormControl>
            </TabPanel>
            </DialogContent>
           
        </Dialog>
    );
  };
  
export default Login;