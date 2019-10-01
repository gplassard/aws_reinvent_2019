import { Session, Deleted, Favorites } from "./model";
import React, { useState, useEffect } from "react";
import { auth, firestore } from "./services/FirebaseService";
import App from "./App";

interface Props {
  sessions: Session[];
}

const AppWithFirebase: React.FC<Props> = (props: Props) => {
  const [deleted, setDeleted] = useState({} as Deleted);
  const [favorites, setFavorites] = useState({} as Favorites);
  const [loggedUser, setLoggedUser] = useState(auth.currentUser);

  const onDelete = async (id: string, isDelete: boolean) => {
    if (isDelete) {
      deleted[id] = isDelete;
    } else {
      delete deleted[id];
    }
    setDeleted({ ...deleted });
    if (loggedUser && loggedUser.uid) {
      await firestore
        .collection("deleted")
        .doc(loggedUser.uid)
        .set(deleted);
    } else {
      localStorage.setItem("deleted", JSON.stringify(deleted));
    }
  };

  const onFavorite = async (id: string, isFavorite: boolean) => {
    if (isFavorite) {
      favorites[id] = isFavorite;
    } else {
      delete favorites[id];
    }
    setFavorites({ ...favorites });
    if (loggedUser && loggedUser.uid) {
      await firestore
        .collection("favorites")
        .doc(loggedUser.uid)
        .set(favorites);
    } else {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  };

  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      setLoggedUser(user);
    });
  }, []);

  useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore
        .collection("deleted")
        .doc(loggedUser.uid)
        .onSnapshot(snapshot => {
          setDeleted(snapshot.data() || {});
        });
    } else {
      const deleted = localStorage.getItem("deleted");
      setDeleted(deleted ? JSON.parse(deleted) : {});
    }
  }, [loggedUser]);

  useEffect(() => {
    if (loggedUser && loggedUser.uid) {
      return firestore
        .collection("favorites")
        .doc(loggedUser.uid)
        .onSnapshot(snapshot => {
          setFavorites(snapshot.data() || {});
        });
    } else {
      const favorites = localStorage.getItem("favorites");
      setFavorites(favorites ? JSON.parse(favorites) : {});
    }
  }, [loggedUser]);

  return (
    <App sessions={props.sessions} favorites={favorites} deleted={deleted} 
    onDelete={onDelete} onFavorite={onFavorite} loggedUser={loggedUser}></App>
  );
};

export default AppWithFirebase;
