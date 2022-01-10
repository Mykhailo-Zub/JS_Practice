import React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import fieldValidator from "../../HOC/FieldValidator/FieldValidator";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function CustomSelect({ value, onChange, invalid, errorText, label, multiple, options }) {
  const handleChange = (event) => {
    const value = event.target.value;
    onChange(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <FormControl error={invalid} sx={{ m: 1, width: 300 }}>
      <InputLabel id={`custom-select-${label}`}>{label}</InputLabel>
      <Select
        labelId={`custom-select-${label}`}
        multiple={multiple}
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (multiple ? <Chip key={value} label={value} /> : value))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errorText}</FormHelperText>
    </FormControl>
  );
}

export default fieldValidator(CustomSelect);
