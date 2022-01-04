import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import styles from "./Filters.module.css";

function Filters({ prices, memory, screen }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState([0, 100]);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 100]);
  const [text, setText] = useState(null);
  const [memoryFilter, setMemoryFilter] = useState("All");
  const [screenFilter, setScreenFilter] = useState(new Array(screen.length).fill(false));

  useEffect(() => {
    const min = prices?.[0] || 0;
    const max = prices?.[prices.length - 1] || 100;
    setMinMaxPrice([min, max]);
    const currentPrice = searchParams
      .get("price")
      ?.split("-")
      .map((el) => parseInt(el));
    setPrice(currentPrice || [min, max]);
  }, [prices, searchParams]);

  useEffect(() => {
    const currentText = searchParams.get("text");
    setText(currentText);
    const currentMemory = searchParams.get("memory");
    setMemoryFilter(currentMemory || "All");
  }, [searchParams]);

  useEffect(() => {
    const values = [];
    const currentScreen = searchParams.get("screen");
    screen.forEach((el, i) => {
      if (currentScreen) {
        if (currentScreen.includes(el.toString())) {
          values[i] = true;
        } else {
          values[i] = false;
        }
      } else {
        values[i] = true;
      }
    });
    setScreenFilter(values);
  }, [screen, searchParams]);

  const screenHandler = (i, value) => {
    const newFilter = [...screenFilter];
    newFilter[i] = value;
    setScreenFilter(newFilter);
  };

  const handleFilters = () => {
    let params = {};
    if (price[0] !== minMaxPrice[0] || price[1] !== minMaxPrice[1]) params.price = `${price[0]}-${price[1]}`;
    if (text) params.text = text;
    if (memoryFilter !== "All") params.memory = memoryFilter;
    if (screenFilter.some((el) => !el)) {
      const screenParams = [];
      screenFilter.forEach((el, i) => {
        if (el) {
          screenParams.push(screen[i]);
        }
      });
      params.screen = screenParams.join(" ");
    }
    setSearchParams(params);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Filters</div>
      <div className={styles.textBlock}>
        <label htmlFor="text">Search by name:</label>
        <input name="text" type="search" value={text || ""} onChange={(e) => setText(e.target.value)} />
      </div>

      <div className={styles.priceBlock}>
        <div className={styles.blockName}>Price:</div>
        <div className={styles.priceSlider}>
          <label>
            <Slider
              getAriaLabel={() => "Price range"}
              value={"" || price}
              min={minMaxPrice[0]}
              max={minMaxPrice[1]}
              onChange={(e) => setPrice([...e.target.value])}
              valueLabelDisplay="auto"
              getAriaValueText={() => `${price} UAH`}
            />
          </label>
        </div>
      </div>
      <div className={styles.memoryBlock}>
        <label htmlFor="memory">Memory:</label>
        <select id="memory" value={memoryFilter} onChange={(e) => setMemoryFilter(e.target.value)}>
          <option value={"All"}>All</option>
          {memory?.map((el, i) => (
            <option value={el} key={i}>
              {el}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.screenBlock}>
        <div className={styles.screenBlockHeader}>Screen size:</div>
        {screen?.map((el, i) => (
          <label key={i}>
            <input type="checkbox" checked={screenFilter[i] || false} onChange={(e) => screenHandler(i, e.target.checked)} />
            {el}
          </label>
        ))}
      </div>
      <button onClick={handleFilters}>Apply filters</button>
    </div>
  );
}

export default Filters;
