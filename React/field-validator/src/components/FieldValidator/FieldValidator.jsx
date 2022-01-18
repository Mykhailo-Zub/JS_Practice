import React from "react";

function FieldValidator({ component, value, onChange, validators, label, variant, type, options, multiple }) {
  const messages = validators.map((el) => el(value)).filter((el) => el);
  const errorText = messages.map((el, i) => {
    return `${i === 0 ? "Input error: " : ""}${el}${i === messages.length - 1 ? "" : ", "}`;
  });

  let fn = (child) =>
    React.cloneElement(child, {
      value,
      onChange,
      invalid: messages.length > 0,
      errorText,
      label,
      variant,
      type,
      options,
      multiple,
    });

  let items = React.Children.map(component, fn);

  return <>{items}</>;
}

export default FieldValidator;
