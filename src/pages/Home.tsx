import React from "react";
import {
  IonPage,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLabel,
  IonLoading,
  IonList,
  IonItem,
} from "@ionic/react";

import {
  useFirestoreCollectionData,
  useFirebaseApp,
  useAuth,
  AuthCheck,
} from "reactfire";
import "firebase/firestore";
import { FIREBASE_COLLECTION_NAME } from "../env";

const Home: React.FunctionComponent = () => {
  const auth = useAuth();
  const thingsRef = useFirebaseApp()
    .firestore()
    .collection(FIREBASE_COLLECTION_NAME);
  const data = useFirestoreCollectionData(thingsRef, { idField: "id" });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="end">
            <IonButton onClick={() => auth.signOut()}>Logout</IonButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AuthCheck fallback={<IonLoading isOpen={true} />}>
          <IonList>
            {data.map((e: any) => {
              return (
                <IonItem key={e.id}>
                  <IonLabel className="ion-text-wrap">
                    {JSON.stringify(e)}
                  </IonLabel>
                </IonItem>
              );
            })}
          </IonList>
        </AuthCheck>
      </IonContent>
    </IonPage>
  );
};
export default Home;
