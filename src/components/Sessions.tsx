import { Session } from "../model";
import React from 'react';
import SessionComp from "./SessionComp";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

interface Props {
    sessions: Session[]
}

const Sessions: React.FC<Props> = (props: Props) => {
    return (
      <Table>
          <TableHead>
              <TableRow>
                  <TableCell/>
                  <TableCell>Day</TableCell>
                  <TableCell>Hotel</TableCell>
                  <TableCell/>
                  <TableCell>Title</TableCell>
                  <TableCell>Abstract</TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
              {props.sessions.map(session => 
                    <SessionComp key={session.id} session={session}></SessionComp>
                )}
          </TableBody>

      </Table>
    );
  }
  
  export default Sessions;