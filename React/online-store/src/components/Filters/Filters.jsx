import React from "react";
import styles from "./Filters.module.css";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomSlider from "../CustomSlider/CustomSlider";

function Filters({ minPrice, maxPrice, memory, screen, searchParams, setSearchParams, saveSearchParams }) {
  const { price: paramsPrice, text: paramsText, memory: paramsMemory, screen: paramsScreen = {} } = searchParams;

  const screenHandler = (option, value) => {
    /*  на счет замечания "к тому же, значения ты можешь хранить
    в формате массива выбранных размеров, чтобы избежать хранения
    общего: всех значений и выбранных среди них"
      --мне же в любом случае нужен массив всех значений, чтобы построить список чекбоксов */
    const params = { ...searchParams };
    params.screen = { ...paramsScreen };
    params.screen[option] = value;
    setSearchParams(params);
  };

  const handleSearchParams = (parameter, value) => {
    const params = { ...searchParams };
    switch (parameter) {
      case "Search by name:":
        params.text = value;
        break;
      case "Price range":
        params.price = value;
        break;
      case "Memory:":
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
