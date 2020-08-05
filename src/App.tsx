import "./env";

import React, { Suspense } from "react";
import { FirebaseAppProvider, AuthCheck } from "reactfire";

import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import { FIREBASE_CONFIG } from "./env";

import Login from "./pages/Login";
import Home from "./pages/Home";

import { Plugins } from "@capacitor/core";
import CreateAccount from "./pages/CreateAccount";
import { DataProvider } from "./DataContext";
const { SplashScreen } = Plugins;

// Hide the splash (you should do this on app launch)
SplashScreen.hide();

const PublicRoutes: React.FunctionComponent = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/login" component={Login} />
      <Route exact path="/create-account" component={CreateAccount} />
      <Redirect exact path="/" to="/login" />
    </IonRouterOutlet>
  );
};

const PrivateRoutes: React.FunctionComponent = () => {
  return (
    <IonRouterOutlet>
      <Route exact path="/home">
        <DataProvider>
          <Home />
        </DataProvider>
      </Route>
      <Redirect exact path="/" to="/home" />
    </IonRouterOutlet>
  );
};

const App: React.FunctionComponent = () => {
  return (
    <FirebaseAppProvider firebaseConfig={FIREBASE_CONFIG}>
      <IonApp>
        <IonReactRouter>
          <Suspense fallback={<IonLoading isOpen={true} />}>
            <AuthCheck fallback={<PublicRoutes />}>
              <PrivateRoutes />
            </AuthCheck>
          </Suspense>
        </IonReactRouter>
      </IonApp>
    </FirebaseAppProvider>
  );
};

export default App;
