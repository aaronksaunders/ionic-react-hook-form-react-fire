import './env';

import React, { Suspense } from "react";
import { FirebaseAppProvider, AuthCheck } from "reactfire";

import { IonApp, IonRouterOutlet, IonLoading } from "@ionic/react";
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

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;

// Hide the splash (you should do this on app launch)
SplashScreen.hide();

const App: React.FunctionComponent = () => {
  return (
    <FirebaseAppProvider firebaseConfig={FIREBASE_CONFIG}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <AuthCheck fallback={<Login />}>
                <Home />
              </AuthCheck>
            </Suspense>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </FirebaseAppProvider>
  );
};

export default App;
