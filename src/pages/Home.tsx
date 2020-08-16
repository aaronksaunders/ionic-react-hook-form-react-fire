import React, { useState } from "react";
import {
  IonPage,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonLoading,
  IonList,
  IonModal,
  IonAlert,
} from "@ionic/react";

import { useAuth, AuthCheck } from "reactfire";
import "firebase/firestore";
import AddSomethingModal, {
  IModalResponse,
  IModalData,
} from "../components/AddSomethingModal";
import { useHistory } from "react-router";
import { useDataProvider } from "../DataContext";
import Line from "./Line";

type IShowAlert = null | {
  header: string;
  subHeader: string;
  message: string;
};

const Home: React.FunctionComponent = () => {
  // reactfire hook to get auth information
  const auth = useAuth();
  const history = useHistory();
  const { addItem, removeItem, dataCollection, updateItem } = useDataProvider();

// manages the state to determine if we need to open
// the modal or not
const [showModal, setShowModal] = useState<{
  show: boolean;
  initialData?: IModalData;
}>({ show: false });

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
 * @param item 
 */
const editSomething = (item: IModalData) => {
  setShowModal({ show: true, initialData: item });
};

  /**
   *
   * @param item IModalData
   */
  const removeSomething = (item: IModalData) => {
    removeItem(item)
      .then(() => showAlert("Success"))
      .catch((error: any) => {
        showAlert(error.message, true);
      });
  };

  /**
   *
   * @param response IModalResponse
   */
  const addSomething = async (response: IModalResponse) => {
    setShowModal({ show: false });
    if (!response.hasData) {
      showAlert("User Cancelled", true);
      return;
    } else {
      try {
        if (response.data?.id) {
          await updateItem(response.data!);
        } else {
          await addItem(response.data!);
        }
        showAlert("Success");
      } catch (error) {
        showAlert(error.message, true);
      }
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                auth.signOut();
                history.replace("/login");
              }}
            >
              Logout
            </IonButton>
          </IonButtons>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonToolbar style={{ paddingLeft: 16, paddingRight: 16 }}>
        <IonButton
          title="Add Something"
          fill="outline"
          onClick={() => setShowModal({ show: true })}
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
        {showModal.show && (
          <IonModal
            isOpen={showModal.show}
            onDidDismiss={() => setShowModal({ show: false })}
          >
            {/* our custom modal content */}
            <AddSomethingModal
              initialData={showModal.initialData}
              onCloseModal={(data: IModalResponse) => addSomething(data)}
            />
          </IonModal>
        )}

        {/* auth check and loader while in progress */}
        <AuthCheck fallback={<IonLoading isOpen={true} />}>
          {/* list of items from reactfire */}
          <IonList>
            {dataCollection.map((e: any) => {
              return (
                <Line
                  item={e}
                  key={e.id}
                  edit={editSomething}
                  remove={removeSomething}
                />
              );
            })}
          </IonList>
        </AuthCheck>
      </IonContent>
    </IonPage>
  );
};
export default React.memo(Home);
