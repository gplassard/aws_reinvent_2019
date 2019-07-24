import { Session } from "../model";
import React from 'react';
import { TableRow, TableCell, Chip } from "@material-ui/core";
import {Star, Delete} from "@material-ui/icons";

interface Props {
    session: Session
}

const SessionComp: React.FC<Props> = (props: Props) => {
    const session = props.session;
    return (
      <TableRow> 
        <TableCell><Star></Star><Delete></Delete></TableCell>
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