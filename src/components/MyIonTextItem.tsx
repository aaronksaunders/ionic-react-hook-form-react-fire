import React from "react";
import { IonItem, IonLabel, IonInput } from "@ionic/react";
import { Controller, useFormContext } from "react-hook-form";
import { MyErrorDisplay } from "./MyErrorDisplay";
/**
 * custom component to render the text fields
 * @param param0
 */
export const MyIonTextItem: React.FunctionComponent<{
  name: string;
  labelName: string;
}> = ({ name, labelName }) => {
  const { control, errors, register } = useFormContext();

  return (
    <>
      <IonItem>
        <IonLabel>{labelName}</IonLabel>
        <Controller
          render={({ onChange }) => (
            <IonInput
              type="text"
              name={name}
              ref={register}
              onIonChange={onChange}
            />
          )}
          control={control}
          name={name}
          rules={{
            required: labelName + " is a required field",
          }}
        />
      </IonItem>
      <MyErrorDisplay errors={errors} elementName={name} />
    </>
  );
};
