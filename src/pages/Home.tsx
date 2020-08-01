import React, { useState } from "react";
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
  IonModal,
  IonAlert,
} from "@ionic/react";

import {
  useFirestoreCollectionData,
  useFirebaseApp,
  useAuth,
  AuthCheck,
} from "reactfire";
import "firebase/firestore";
import { FIREBASE_COLLECTION_NAME } from "../env";
import AddSomethingModal, { IModalResponse } from "./AddSomethingModal";

type IShowAlert = null | {
  header: string;
  subHeader: string;
  message: string;
};

const Home: React.FunctionComponent = () => {
  // reactfire hook to get auth information
  const auth = useAuth();

  // another reactfire hook to get the firebase app
  const thingsRef = useFirebaseApp()
    .firestore()
    .collection(FIREBASE_COLLECTION_NAME);

  // another hook to query firebase collection using
  // the reference you created above
  const data = useFirestoreCollectionData(thingsRef, { idField: "id" });

  // manages the state to determine if we need to open
  // the modal or not
  const [showModal, setShowModal] = useState(false);

  // manages the state to determine if we need to open
  // the modal or not
  const [showErrorAlert, setShowErrorAlert] = useState<IShowAlert>(null);

  /**
   * call this function to set state to get the alert
   * to display
   *
   * @param message
   * @param isError
   */
  const showAlert = (message: string, isError: boolean = false) => {
    setShowErrorAlert({
      header: "App Alert",
      subHeader: isError ? "Error" : "Notification",
      message: message,
    });
  };

  /**
   *
   * @param response
   */
  const addSomething = async (response: IModalResponse) => {
    setShowModal(false);
    if (response.hasData) {
      alert(JSON.stringify(response.data));
      thingsRef
        .doc()
        .set({ ...response.data })
        .then(() => showAlert("Success"))
        .catch((error) => {
          showAlert(error.message, true);
        });
    } else {
      showAlert("User Cancelled", true);
    }
  };

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
      <IonToolbar style={{ paddingLeft: 16, paddingRight: 16 }}>
        <IonButton
          title="Add Something"
          fill="outline"
          onClick={() => setShowModal(true)}
        >
          Add Something
        </IonButton>
      </IonToolbar>
      <IonContent className="ion-padding">
        {/**  Show Error when problem **/}
        <IonAlert
          isOpen={showErrorAlert !== null}
          onDidDismiss={() => setShowErrorAlert(null)}
          header={showErrorAlert?.header}
          subHeader={showErrorAlert?.subHeader}
          message={showErrorAlert?.message}
          buttons={["OK"]}
        />

        {/* ionic modal component */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          {/* our custom modal content */}
          <AddSomethingModal
            onCloseModal={(data: IModalResponse) => addSomething(data)}
          />
        </IonModal>

        {/* auth check and loader while in progress */}
        <AuthCheck fallback={<IonLoading isOpen={true} />}>
          {/* list of items from reactfire */}
          <IonList>
            {data.map((e: any) => {
              return (
                <IonItem key={e.id}>
                  <IonLabel className="ion-text-wrap">
                    <pre>{JSON.stringify(e, null, 2)}</pre>
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
