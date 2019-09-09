import { Dialog, DialogTitle, DialogContent, Tabs, Tab } from "@material-ui/core";
import React from 'react';
import TabPanel from "../utils/TabPanel";

interface Props {
    open: boolean
    onClose: () => any
}


const Login: React.FC<Props> = (props: Props) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    return (
        <Dialog open={props.open}>
            <DialogContent>
                <Tabs value={tabIndex}>
                    <Tab label="Login" id="" />
                    <Tab label="Sign In"></Tab>
                </Tabs>
            </DialogContent>
            <TabPanel active={tabIndex} index={1}></TabPanel>
        </Dialog>
    );
  };
  
export default Login;