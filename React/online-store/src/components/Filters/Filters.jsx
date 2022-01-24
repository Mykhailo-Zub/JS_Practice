import React from "react";
import styles from "./Filters.module.css";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomSlider from "../CustomSlider/CustomSlider";

function Filters({ minPrice, maxPrice, memory, screen, searchParams, setSearchParams, saveSearchParams }) {
  const { price: paramsPrice, text: paramsText, memory: paramsMemory, screen: paramsScreen = {} } = searchParams;

  const screenHandler = (option, value) => {
    const newFilter = { ...paramsScreen };
    newFilter[option] = value;
    const params = { ...searchParams };
    params.screen = newFilter;
    setSearchParams(params);
  };

  const handleSearchParams = (parameter, value) => {
    const params = { ...searchParams };
    switch (parameter) {
      case "text":
        params.text = value;
        break;
      case "price":
        params.price = value;
        break;
      case "memory":
        params.memory = value !== "All" ? parseInt(value) : "";
        break;
      default:
        break;
    }
    setSearchParams(params);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>Filters</div>
      <div className={styles.textBlock}>
        <CustomTextInput value={paramsText || ""} changeFunction={handleSearchParams} label="Search by name:" />
      </div>

      <div className={styles.priceBlock}>
        <div className={styles.blockName}>Price:</div>
        <div className={styles.priceSlider}>
          <CustomSlider label="Price range" value={paramsPrice} minValue={minPrice} maxValue={maxPrice} changeFunction={handleSearchParams} />
        </div>
      </div>
      <div className={styles.memoryBlock}>
        <CustomSelect
          value={paramsMemory}
          changeFunction={handleSearchParams}
          label="Memory:"
          optionsArr={memory}
          defaultValue="All"
          optionPostfix=" GB"
        />
      </div>
      <div className={styles.screenBlock}>
        <div className={styles.screenBlockHeader}>Screen size:</div>
        {screen?.map((el, i) => (
          <CustomCheckbox key={i} value={paramsScreen[el] || false} changeFunction={screenHandler} label={el} labelPostfix='"' />
        ))}
      </div>
      <button onClick={saveSearchParams}>Save filters</button>
    </div>
  );
}

export default Filters;
