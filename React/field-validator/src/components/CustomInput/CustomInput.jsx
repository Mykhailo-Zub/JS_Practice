import React from "react";
import fieldValidator from "../../HOC/FieldValidator/FieldValidator";
import TextField from "@mui/material/TextField";

function CustomInput({ value, onChange, invalid, errorText, label, variant, type }) {
  return (
    <TextField
      sx={{ m: 1, width: 300 }}
      error={invalid}
      onChange={(e) => onChange(e.target.value)}
      label={label}
      value={value}
      helperText={errorText}
      variant={variant}
      type={type}
    />
  );
}

export default fieldValidator(CustomInput);
