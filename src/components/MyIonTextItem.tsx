import React from "react";
import {
  IonItem,
  IonLabel,
  IonInput
} from "@ionic/react";
import { Controller } from "react-hook-form";
import { MyErrorDisplay } from "./MyErrorDisplay";
/**
 * custom component to render the text fields
 * @param param0
 */
export const MyIonTextItem: React.FunctionComponent<{
  name: string;
  errors: any;
  render?: any;
  control: any;
  labelName: string;
}> = ({ name, errors, render, control, labelName }) => {
  return (
    <>
      <IonItem>
        <IonLabel>{labelName}</IonLabel>
        <Controller
          render={({ onChange }) => (
            <IonInput type="text" onIonChange={onChange} defaultValue="" />
          )}
          control={control}
          name={name}
          rules={{
            required: labelName + " is a required field",
          }} />
      </IonItem>
      <MyErrorDisplay errors={errors} elementName={name} />
    </>
  );
};
