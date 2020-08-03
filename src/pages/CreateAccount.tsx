import React, { useState } from "react";
import {
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonInput,
  IonAlert,
} from "@ionic/react";

import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { useAuth } from "reactfire";
import { useHistory } from "react-router";

export interface CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
}

const CreateAccount: React.FunctionComponent = () => {
  const history = useHistory();
  const [showErrorAlert, setShowErrorAlert] = useState("");

  // from react-hook-form
  // SEE - https://react-hook-form.com/
  const { handleSubmit, control, errors } = useForm({
    defaultValues : {
      email : "",
      password : ""
    }
  });
  const auth = useAuth();

  /**
   * get data from form and sign the user in
   */
  const createNewUser = async (data: any) => {
    console.log(data);
    try {
      let r = await auth.createUserWithEmailAndPassword(
        data.email,
        data.password
      );
      console.log(r);
      history.replace("/")
    } catch (e) {
      setShowErrorAlert(e.message);
    }
  };

  const myErrorDisplay = (elementName: string) => {
    return (
      <ErrorMessage
        errors={errors}
        name={elementName}
        as={
          <div
            style={{
              color: "red",
              paddingTop: 6,
              paddingLeft: 16,
              fontStyle: "italic",
            }}
          />
        }
      />
    );
  };

  console.log(history);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" />
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/**  Show Error when problem Logging In **/}
        <IonAlert
          isOpen={showErrorAlert !== ""}
          onDidDismiss={() => setShowErrorAlert("")}
          header={"Firebase Error"}
          subHeader={"Error Logging In"}
          message={showErrorAlert}
          buttons={["OK"]}
        />
        

        <form id="create-form" onSubmit={handleSubmit(createNewUser)}  >
          <IonItem>
            <IonLabel>Email</IonLabel>
            <Controller
              render={({ onChange }) => (
                <IonInput type="email" onIonChange={onChange} defaultValue=""/>
              )}
              control={control}
              defaultValue=""
              autoComplete="new-password"
              name="email"
              rules={{
                required: "'Email Address' is a required field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
            />
          </IonItem>
          {myErrorDisplay("email")}
          <IonItem>
            <IonLabel>Password</IonLabel>
            <Controller
              render={({ onChange }) => (
                <IonInput type="password" onIonChange={onChange} autocomplete="new-password" />
              )}
              control={control}
              autoComplete="new-password"
              name="password"
              rules={{
                required: "'Password' is a required field",
              }}
            />
          </IonItem>
          {myErrorDisplay("password")}
          <div className="ion-padding">
            <IonButton expand="block" type="submit">
              Create New Account
            </IonButton>
            <IonButton
              color="danger"
              expand="block"
              onClick={() => history.goBack()}
            >
              Cancel
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;
