import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Slider from "@mui/material/Slider";
import styles from "./Filters.module.css";

function Filters({ prices }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState([0, 100]);
  const [minMaxPrice, setMinMaxPrice] = useState([0, 100]);

  useEffect(() => {
    const min = prices?.[0];
    const max = prices?.[prices.length - 1];
    setMinMaxPrice([min, max]);
    const currentPrice = searchParams
      .get("price")
      ?.split("-")
      .map((el) => parseInt(el));
    setPrice(currentPrice || [min, max]);
  }, [prices]);

  const handleFilters = () => {
    setSearchParams({ price: `${price[0]}-${price[1]}` });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Filters</div>
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
      <button onClick={handleFilters}>Apply filters</button>
    </div>
  );
}

export default Filters;
