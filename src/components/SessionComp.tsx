import { Session } from "../model";
import React from 'react';
import { TableRow, TableCell, Chip } from "@material-ui/core";
import SessionTitle from "./SessionTitle";
import SessionActions from "./SessionActions";

interface Props {
    session: Session
    favorite: boolean
    deleted: boolean
    onFavorite: (id: string, isFavorite: boolean) => any
    onDelete: (id: string, isDelete: boolean) => any
}

const SessionComp: React.FC<Props> = (props: Props) => {
    const session = props.session;
    return (
      <TableRow> 
        <TableCell>
          <SessionActions session={session} favorite={props.favorite} deleted={props.deleted}
              onFavorite={props.onFavorite} onDelete={props.onDelete}></SessionActions>
        </TableCell>
        <TableCell>{session.times || session.day}</TableCell>
        <TableCell>{session.hotel}</TableCell>
        <TableCell>
          <Chip label={ session.type} color="primary"/>
          <Chip label={ session.level} className={session.level}/>
        </TableCell>
        <TableCell>
          <SessionTitle session={session}></SessionTitle>
        </TableCell>
        <TableCell>{session.abstract}</TableCell>
      </TableRow>
    );
  }
  
  export default SessionComp;