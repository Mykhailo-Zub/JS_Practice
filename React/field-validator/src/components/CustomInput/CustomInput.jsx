import React from "react";
import TextField from "@mui/material/TextField";

function CustomInput({ value, onChange, errorText, label, variant, type }) {
  return (
    <TextField
      sx={{ m: 1, width: 300 }}
      error={!!errorText}
      onChange={(e) => onChange(e.target.value)}
      label={label}
      value={value}
      helperText={errorText}
      variant={variant}
      type={type}
    />
  );
}

export default CustomInput;
