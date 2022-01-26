function FieldValidator({ component, value, validators, ...otherProps }) {
  const messages = validators.map((el) => el(value)).filter((el) => el);
  const errorText = messages.length > 0 ? `Input error: ${messages.join(", ")}` : null;

  return component({ ...otherProps, value, errorText });
}

export default FieldValidator;
