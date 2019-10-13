import React from "react";
import { Dialog, DialogContent, DialogTitle, Chip, Typography } from "@material-ui/core";
import { Session } from "../../model";
import SessionTitle from "../SessionTitle";
import SessionActions from "../SessionActions";

interface Props {
    session: Session | null
    onClose: () => any
    favorite: boolean
    deleted: boolean
    onFavorite: (session: Session, isFavorite: boolean) => any
    onDelete: (session: Session, isDelete: boolean) => any
}

const SessionDialog: React.FC<Props> = (props: Props) => {
    const session = props.session;

    async function handleClose() {
        props.onClose();
    }

    return (
        session ? 
        <Dialog open={true} onClose={handleClose} fullWidth>
                <DialogTitle>
                    <SessionTitle session={session}></SessionTitle>
                    <Chip label={ session.type} color="primary"/>
                    <Chip label={ session.level} className={"level-" + session.level}/>
                    <Chip label={ session.track} className={"track-" + session.trackId}/>
                    <SessionActions session={session} favorite={props.favorite} deleted={props.deleted} onFavorite={props.onFavorite} 
                            onDelete={props.onDelete}></SessionActions>
                </DialogTitle>
                <DialogContent>
                    <Typography>{session.abstract}</Typography>
                </DialogContent>
        </Dialog> :
         null
    );
  };
  
export default SessionDialog;