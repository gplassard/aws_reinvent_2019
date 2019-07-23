import { Session } from "../model";
import React from 'react';
import SessionComp from "./SessionComp";

interface Props {
    sessions: Session[]
}

const Sessions: React.FC<Props> = (props: Props) => {
    return (
      <table>
          <thead>
              <tr>
                  <td/>
                  <td>Day</td>
                  <td>Hotel</td>
                  <td/>
                  <td>Title</td>
                  <td>Abstract</td>
              </tr>
          </thead>
          <tbody>
              {props.sessions.map(session => 
                    <SessionComp key={session.id} session={session}></SessionComp>
                )}
          </tbody>

      </table>
    );
  }
  
  export default Sessions;