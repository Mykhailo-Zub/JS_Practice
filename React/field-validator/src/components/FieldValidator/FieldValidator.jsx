function FieldValidator({ component, value, validators, ...otherProps }) {
  const messages = validators.map((el) => el(value)).filter((el) => el);
  const invalid = messages.length > 0;
  const errorText = invalid ? `Input error: ${messages.join(", ")}` : null;

  return component({ ...otherProps, value, errorText, invalid });
}

export default FieldValidator;
