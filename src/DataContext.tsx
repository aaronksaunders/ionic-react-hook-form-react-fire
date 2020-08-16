import React from "react";
import { useFirebaseApp, useFirestoreCollectionData } from "reactfire";
import { FIREBASE_COLLECTION_NAME } from "./env";

import { IModalData } from "./components/AddSomethingModal";

interface IState {
  dataCollection: null | undefined | any;
  updateItem: (itemData: IModalData) => Promise<void>;
  addItem: (itemData: IModalData) => Promise<void>;
  removeItem: (itemData: IModalData) => Promise<void>;
}

// create the context
export const DataContext = React.createContext<IState | undefined>(undefined);

// create the context provider, we are using use state to ensure that
// we get reactive values from the context...

export const DataProvider: React.FC = ({ children }) => {
  // another reactfire hook to get the firebase app
  const thingsRef = useFirebaseApp()
    .firestore()
    .collection(FIREBASE_COLLECTION_NAME);

  // another hook to query firebase collection using
  // the reference you created above
  const data = useFirestoreCollectionData(thingsRef, { idField: "id" });

  /**
   *
   * @param itemData
   */
  const addItem = (itemData: IModalData) => {
    return thingsRef.doc().set({ ...itemData });
  };

  /**
   *
   * @param itemData
   */
const updateItem = (itemData: IModalData) => {
  return thingsRef.doc(itemData.id).set({ ...itemData }, { merge: true });
};

  /**
   *
   * @param itemData
   */
  const removeItem = (itemData: IModalData) => {
    return thingsRef.doc(itemData.id).delete();
  };

// the store object
let state = {
  dataCollection: data,
  addItem,
  updateItem,
  removeItem,
};

// wrap the application in the provider with the initialized context
return <DataContext.Provider value={state}>{children}</DataContext.Provider>;
};

export default DataContext;
export const useDataProvider = () =>
  React.useContext<IState | undefined>(DataContext)!;
