import React from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonLabel,
  IonItem,
  IonText,
} from "@ionic/react";

import { useForm, FormProvider } from "react-hook-form";
import { MyIonTextItem } from "./MyIonTextItem";

const AddSomethingModal: React.FunctionComponent<{
  onCloseModal: (data: IModalResponse) => Promise<void>;
  initialData?: IModalData;
}> = ({ onCloseModal, initialData }) => {
  // from react-hook-form
  const methods = useForm({
    defaultValues: initialData,
  });
  /**
   * get data from form and pass it back to the parent
   * component
   */
  const addTheThing = async (data: IModalData) => {
    console.log({ ...initialData, ...data });
    onCloseModal({ hasData: true, data: { ...initialData, ...data } });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" />
          <IonTitle>{initialData ? "Update " : "Create New "} Thing</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(addTheThing)}>
            <MyIonTextItem labelName="Podcast Name" name="podcastName" />

            <MyIonTextItem labelName="Host" name="podcastHost" />

            <MyIonTextItem labelName="URL" name="podcastURL" />
            {initialData && (
              <IonItem>
                <IonLabel>ID</IonLabel>
                <IonText>{initialData.id}</IonText>
              </IonItem>
            )}

            <div className="ion-padding">
              <IonButton expand="block" type="submit">
                {initialData ? "Update " : "Save "} Podcast Information
              </IonButton>
              {!initialData && (
                <IonButton
                  color="warning"
                  expand="block"
                  type="button"
                  onClick={() =>
                    methods.reset({
                      podcastHost: "",
                      podcastName: "",
                      podcastURL: "",
                    })
                  }
                >
                  Clear Form
                </IonButton>
              )}
              <IonButton
                color="danger"
                expand="block"
                type="button"
                onClick={() =>
                  onCloseModal({ hasData: false, data: undefined })
                }
              >
                Cancel
              </IonButton>
            </div>
          </form>
        </FormProvider>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(AddSomethingModal);

export type IModalData = {
  podcastName: string;
  podcastHost: string;
  podcastURL: string;
  id?: string;
};

export type IModalResponse = {
  hasData: boolean;
  data?: IModalData;
};
