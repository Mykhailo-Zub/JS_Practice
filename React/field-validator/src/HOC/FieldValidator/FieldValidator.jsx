import React, { useEffect, useState } from "react";

function fieldValidator(InnerComponent) {
  return function FieldValidator({ value, onChange, validators, label, variant, type, options, multiple }) {
    const [invalidText, setInvalidText] = useState([]);

    useEffect(() => {
      setInvalidText(validators.map((el) => el(value)));
    }, [value, validators]);

    const messages = invalidText.filter((el) => el);
    const errorText = messages.map((el, i) => {
      return `${i === 0 ? "Input error: " : ""}${el}${i === messages.length - 1 ? "" : ", "}`;
    });

    return (
      <>
        <InnerComponent
          value={value}
          onChange={onChange}
          invalid={messages.length > 0}
          errorText={errorText}
          label={label}
          variant={variant}
          type={type}
          options={options}
          multiple={multiple}
        />
      </>
    );
  };
}

export default fieldValidator;
