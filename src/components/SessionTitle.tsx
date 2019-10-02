import { Session } from "../model";
import React, { Fragment } from "react";

interface Props {
    session: Session
}

const SessionTitle: React.FC<Props> = (props: Props) => {
    const session = props.session;
    return (
      <Fragment>
            <a href={`https://www.portal.reinvent.awsevents.com/connect/search.ww?trk=typed_bookmarked#loadSearch-searchPhrase="${session.abbr}"&searchType=session`}>
                {session.abbr}
            </a>
            {' '}
            {session.title}
    </Fragment>
    );
  }
  
  export default SessionTitle;