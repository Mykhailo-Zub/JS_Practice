import React from "react";
import Slider from "@mui/material/Slider";

function CustomSlider({ value, minValue, maxValue, changeFunction, label }) {
  return (
    <>
      <Slider
        getAriaLabel={() => label}
        value={value || [minValue, maxValue]}
        min={minValue}
        max={maxValue}
        onChange={(e) => changeFunction([...e.target.value])}
        valueLabelDisplay="auto"
        getAriaValueText={() => `${value} UAH`}
      />
    </>
  );
}

export default CustomSlider;
