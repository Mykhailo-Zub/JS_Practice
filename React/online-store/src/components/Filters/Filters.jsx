import React from "react";
import styles from "./Filters.module.css";
import CustomTextInput from "../CustomTextInput/CustomTextInput";
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomCheckbox from "../CustomCheckbox/CustomCheckbox";
import CustomSlider from "../CustomSlider/CustomSlider";

const TEXT = "TEXT";
const PRICE = "PRICE";
const MEMORY = "MEMORY";
const SCREEN = "SCREEN";

function Filters({ minPrice, maxPrice, memory, screen, searchParams, setSearchParams, saveSearchParams }) {
  const { price: paramsPrice, text: paramsText, memory: paramsMemory, screen: paramsScreen = {} } = searchParams;

  const handleSearchParams = (parameter, value) => {
    const params = { ...searchParams };
    switch (parameter) {
      case TEXT:
        params.text = value;
        break;
      case PRICE:
        params.price = value;
        break;
      case MEMORY:
        params.memory = value !== "All" ? parseInt(value) : "";
        break;
      case SCREEN:
        const [index, isSelected] = value;
        const newParamsScreen = [...paramsScreen];
        newParamsScreen[index] = isSelected;
        params.screen = newParamsScreen;
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
        <CustomTextInput value={paramsText || ""} changeFunction={handleSearchParams} label="Search by name:" handlerId={TEXT} />
      </div>

      <div className={styles.priceBlock}>
        <div className={styles.blockName}>Price:</div>
        <div className={styles.priceSlider}>
          <CustomSlider
            label="Price range"
            value={paramsPrice}
            minValue={minPrice}
            maxValue={maxPrice}
            changeFunction={handleSearchParams}
            handlerId={PRICE}
          />
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
          handlerId={MEMORY}
        />
      </div>
      <div className={styles.screenBlock}>
        <div className={styles.screenBlockHeader}>Screen size:</div>
        {screen?.map((el, i) => (
          <CustomCheckbox
            key={i}
            value={paramsScreen[i] || false}
            changeFunction={handleSearchParams}
            label={el}
            labelPostfix='"'
            handlerId={SCREEN}
            index={i}
          />
        ))}
      </div>
      <button onClick={saveSearchParams}>Save filters</button>
    </div>
  );
}

export default Filters;
