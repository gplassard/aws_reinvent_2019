import React from "react";
import { Dialog, DialogContent, DialogTitle, FormControlLabel, Switch } from "@material-ui/core";
import {  Preferences } from "../../model";

interface Props {
    preferences: Preferences
    updatePreferences: (preferences: Preferences) => Promise<void>
    onClose: () => any
    open: boolean
}

const PreferencesDialog: React.FC<Props> = (props: Props) => {

    async function handleClose() {
        props.onClose();
    }

    const onSwitch = (field: 'applyToRepeats') => (event: React.ChangeEvent<{}>, checked: boolean) => {
        props.preferences[field] = checked;
        props.updatePreferences(props.preferences)
    }  

    return (
        <Dialog open={props.open} onClose={handleClose} fullWidth>
                <DialogTitle>
                    Préférences               
                </DialogTitle>
                <DialogContent>
                <FormControlLabel
            className="switchField"
            control= {<Switch  checked={props.preferences.applyToRepeats}/>} 
            onChange={onSwitch('applyToRepeats')}
            label="Apply favorites / deletes to repeats"/>                   
                </DialogContent>
        </Dialog>
    );
  };
  
export default PreferencesDialog;