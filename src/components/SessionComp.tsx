import { Session } from "../model";
import React from 'react';

interface Props {
    session: Session
}

const SessionComp: React.FC<Props> = (props: Props) => {
    const session = props.session;
    return (
      <tr> 
        <td/>
        <td>{session.times || session.day}</td>
        <td>{session.hotel}</td>
        <td>{session.type}, {session.level}</td>
        <td>
            <a href={`https://www.portal.reinvent.awsevents.com/connect/search.ww?trk=typed_bookmarked#loadSearch-searchPhrase="${session.abbr}"&searchType=session`}>
                {session.abbr}
            </a>
            {session.title}
        </td>
        <td>{session.abstract}</td>
      </tr>
    );
  }
  
  export default SessionComp;