import { Session } from "../model";
import React from 'react';
import SessionComp from "./SessionComp";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";

interface Props {
    sessions: Session[]
    favorites:  {[id: string]: boolean}
    deleted: {[id: string]: boolean}
    onFavorite: (id: string, isFavorite: boolean) => any
    onDelete: (id: string, isDelete: boolean) => any
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
                    <SessionComp key={session.id} session={session} favorite={!!props.favorites[session.id]} deleted={!!props.deleted[session.id]}
                        onDelete={props.onDelete} onFavorite={props.onFavorite} ></SessionComp>
                )}
          </TableBody>

      </Table>
    );
  }
  
  export default Sessions;