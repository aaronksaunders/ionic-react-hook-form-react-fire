import React from "react";
import { ErrorMessage } from "@hookform/error-message";
/**
 * custom component to render the error messahe with the
 * desired style, we are wrapping a react-form-hook utility
 *
 * @param errors
 * @param elementName
 */
export const MyErrorDisplay: React.FunctionComponent<{
  errors: any;
  elementName: string;
}> = ({ errors, elementName }) => {
  return (
    <ErrorMessage
      errors={errors}
      name={elementName}
      as={<div
        style={{
          color: "red",
          paddingTop: 6,
          paddingLeft: 16,
          fontStyle: "italic",
        }} />} />
  );
};
