import React, { useEffect, useState } from "react";
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

import { useAuth } from "reactfire";
import { useHistory } from "react-router";
import { MyErrorDisplay } from "../components/MyErrorDisplay";

export interface CheckboxChangeEventDetail {
  value: any;
  checked: boolean;
}

const Login: React.FunctionComponent = () => {
  const history = useHistory();
  const [showErrorAlert, setShowErrorAlert] = useState("");

  // SEE - https://github.com/FirebaseExtended/reactfire/issues/228
  useEffect(() => {
    let map = (globalThis as any)["_reactFirePreloadedObservables"];
    map &&
      Array.from(map.keys()).forEach(
        (key: any) => key.includes("firestore") && map.delete(key)
      );
  }, []);

  // from react-hook-form
  // SEE - https://react-hook-form.com/
  const { handleSubmit, control, errors } = useForm();
  const auth = useAuth();
  /**
   * get data from form and sign the user in
   */
  const signIn = async (data: any) => {
    console.log(data);
    try {
      let r = await auth.signInWithEmailAndPassword(data.email, data.password);
      history.replace("/home");
      console.log(r);
    } catch (e) {
      setShowErrorAlert(e.message);
    }
  };

  console.log(history);
  return (
     <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start" />
          <IonTitle>Login</IonTitle>
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

        <form onSubmit={handleSubmit(signIn)}>
          <IonItem>
            <IonLabel>Email</IonLabel>
            <Controller
              render={({ onChange }) => (
                <IonInput type="email" onIonChange={onChange} />
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
          <MyErrorDisplay errors={errors} elementName="email" />
          <IonItem>
            <IonLabel>Password</IonLabel>
            <Controller
              render={({ onChange }) => (
                <IonInput
                  type="password"
                  onIonChange={onChange}
                  autocomplete="new-password"
                />
              )}
              control={control}
              autoComplete="new-password"
              name="password"
              rules={{
                required: "'Password' is a required field",
              }}
            />
          </IonItem>
          <MyErrorDisplay errors={errors} elementName="password" />
          <div className="ion-padding">
            <IonButton expand="block" type="submit">
              Log In
            </IonButton>
            <IonButton
              expand="block"
              type="button"
              onClick={() => history.push("/create-account")}
            >
              Create Account
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
