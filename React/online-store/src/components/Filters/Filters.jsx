import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import styles from "./Filters.module.css";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";

function Filters({ minPrice, maxPrice, memory, screen, searchParams, saveSearchParams }) {
  const { price: paramsPrice, text: paramsText, memory: paramsMemory, screen: paramsScreen } = searchParams;
  const [price, setPrice] = useState([0, 100]);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 100]);
  const [text, setText] = useState(null);
  const [memoryFilter, setMemoryFilter] = useState("All");
  const [screenFilter, setScreenFilter] = useState({});

  useEffect(() => {
    setMinMaxPrice([minPrice || 0, maxPrice || 100]);
    setPrice(paramsPrice || [minPrice, maxPrice]);
  }, [minPrice, maxPrice, paramsPrice]);

  useEffect(() => {
    setMemoryFilter(paramsMemory || "All");
  }, [paramsMemory]);

  useEffect(() => {
    setText(paramsText);
  }, [paramsText]);

  useEffect(() => {
    const newScreenFilter = screen.reduce((acc, el, i) => {
      if (paramsScreen) {
        if (paramsScreen.includes(el.toString())) {
          return { ...acc, [el]: true };
        } else {
          return { ...acc, [el]: false };
        }
      } else {
        return { ...acc, [el]: true };
      }
    }, {});
    setScreenFilter(newScreenFilter);
  }, [screen, paramsScreen]);

  const screenHandler = (option, value) => {
    const newFilter = { ...screenFilter };
    newFilter[option] = value;
    setScreenFilter(newFilter);
  };

  const handleFilters = () => {
    let params = {};
    if (price[0] !== minMaxPrice[0] || price[1] !== minMaxPrice[1]) params.price = `${price[0]}-${price[1]}`;
    if (text) params.text = text;
    if (memoryFilter !== "All") params.memory = memoryFilter;
    if (Object.values(screenFilter).some((el) => !el)) {
      const screenParams = [];
      for (let screen in screenFilter) {
        if (screenFilter[screen]) screenParams.push(screen);
      }
      params.screen = screenParams.join(" ");
    }
    saveSearchParams(params);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Filters</div>
      <div className={styles.textBlock}>
        <CustomTextInput value={text || ""} changeFunction={(e) => setText(e.target.value)} label="Search by name:" />
      </div>

      <div className={styles.priceBlock}>
        <div className={styles.blockName}>Price:</div>
        <div className={styles.priceSlider}>
          <Slider
            getAriaLabel={() => "Price range"}
            value={"" || price}
            min={minMaxPrice[0]}
            max={minMaxPrice[1]}
            onChange={(e) => setPrice([...e.target.value])}
            valueLabelDisplay="auto"
            getAriaValueText={() => `${price} UAH`}
          />
        </div>
      </div>
      <div className={styles.memoryBlock}>
        <CustomSelect
          value={memoryFilter}
          changeFunction={(e) => setMemoryFilter(e.target.value)}
          label="Memory:"
          optionsArr={memory}
          defaultValue="All"
          optionPostfix=" GB"
        />
      </div>
      <div className={styles.screenBlock}>
        <div className={styles.screenBlockHeader}>Screen size:</div>
        {screen?.map((el, i) => (
          <CustomCheckbox
            key={i}
            value={screenFilter[el] || false}
            changeFunction={(e) => screenHandler(el, e.target.checked)}
            label={el}
            labelPostfix='"'
          />
        ))}
      </div>
      <button onClick={handleFilters}>Apply filters</button>
    </div>
  );
}

export default Filters;
