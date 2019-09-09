import { Session } from "../model";
import React from 'react';
import { TableRow, TableCell, Chip } from "@material-ui/core";
import {Star, Delete, StarBorder, DeleteOutline} from "@material-ui/icons";

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
          {props.favorite ? 
            <Star onClick={() => props.onFavorite(session.id, !props.favorite)} className="clickable"/> : 
            <StarBorder onClick={() => props.onFavorite(session.id, !props.favorite)} className="clickable"/> }
          {props.deleted ? 
            <Delete onClick={() => props.onDelete(session.id, !props.deleted)} className="clickable"/> : 
            <DeleteOutline onClick={() => props.onDelete(session.id, !props.deleted)} className="clickable"/> }
        </TableCell>
        <TableCell>{session.times || session.day}</TableCell>
        <TableCell>{session.hotel}</TableCell>
        <TableCell>
          <Chip label={ session.type} color="primary"/>
          <Chip label={ session.level} className={session.level}/>
        </TableCell>
        <TableCell>
            <a href={`https://www.portal.reinvent.awsevents.com/connect/search.ww?trk=typed_bookmarked#loadSearch-searchPhrase="${session.abbr}"&searchType=session`}>
                {session.abbr}
            </a>
            {' '}
            {session.title}
        </TableCell>
        <TableCell>{session.abstract}</TableCell>
      </TableRow>
    );
  }
  
  export default SessionComp;