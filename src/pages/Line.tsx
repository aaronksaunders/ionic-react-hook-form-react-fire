import React from "react";
import { IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { removeCircleOutline } from "ionicons/icons";
import { IModalData } from "../components/AddSomethingModal";
const Line: React.FunctionComponent<{
  item: IModalData;
  edit: (e: any) => void;
  remove: (e: any) => void;
}> = ({ item, edit, remove }) => {
  return (
    <IonItem>
      <IonLabel className="ion-text-wrap" onClick={() => edit(item)}>
        <pre>{JSON.stringify(item, null, 2)}</pre>
      </IonLabel>
      <IonButton onClick={() => remove(item)} slot="end" color="danger">
        <IonIcon icon={removeCircleOutline} />
      </IonButton>
    </IonItem>
  );
};
export default React.memo(Line);
