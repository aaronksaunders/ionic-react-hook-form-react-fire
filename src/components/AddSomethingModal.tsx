import React from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
} from "@ionic/react";

import { useForm } from "react-hook-form";
import { MyIonTextItem } from "./MyIonTextItem";

const AddSomethingModal: React.FunctionComponent<{
  onCloseModal: (data: IModalResponse) => Promise<void>;
}> = ({ onCloseModal }) => {
  // from react-hook-form
  // SEE - https://react-hook-form.com/
  const { handleSubmit, control, errors } = useForm();
  /**
   * get data from form and pass it back to the parent
   * component
   */
  const addTheThing = async (data: IModalData) => {
    console.log(data);
    onCloseModal({ hasData: true, data });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" />
          <IonTitle>Enter Thing Information</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit(addTheThing)}>
          <MyIonTextItem
            labelName="Podcast Name"
            name="podcastName"
            errors={errors}
            control={control}
          />

          <MyIonTextItem
            labelName="Host"
            name="podcastHost"
            errors={errors}
            control={control}
          />

          <MyIonTextItem
            labelName="URL"
            name="podcastURL"
            errors={errors}
            control={control}
          />

          <div className="ion-padding">
            <IonButton expand="block" type="submit">
              Save Podcast Information
            </IonButton>
            <IonButton
              expand="block"
              type="button"
              onClick={() => onCloseModal({ hasData: false })}
            >
              Cancel
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default AddSomethingModal;

export type IModalData = {
  podcastName: string;
  podcastHost: string;
  podcastURL: string;
  id? : string;
};

export type IModalResponse = {
  hasData: boolean;
  data?: IModalData;
};
