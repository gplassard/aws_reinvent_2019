import { Session } from "../model";
import React, { Fragment } from "react";
import { Star, StarBorder, Delete, DeleteOutline } from "@material-ui/icons";

interface Props {
    session: Session
    favorite: boolean
    deleted: boolean
    onFavorite: (id: string, isFavorite: boolean) => any
    onDelete: (id: string, isDelete: boolean) => any
}

const SessionActions: React.FC<Props> = (props: Props) => {
    const session = props.session;
    return (
        <Fragment>
        {props.favorite ? 
            <Star onClick={() => props.onFavorite(session.id, !props.favorite)} className="clickable"/> : 
            <StarBorder onClick={() => props.onFavorite(session.id, !props.favorite)} className="clickable"/> }
          {props.deleted ? 
            <Delete onClick={() => props.onDelete(session.id, !props.deleted)} className="clickable"/> : 
            <DeleteOutline onClick={() => props.onDelete(session.id, !props.deleted)} className="clickable"/> }
        </Fragment>
    );
  }
  
  export default SessionActions;