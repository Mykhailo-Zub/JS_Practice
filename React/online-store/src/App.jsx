import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./App.module.css";
import Filters from "./components/Filters/Filters";
import Product from "./components/Product/Product";
import { getAllProducts } from "./requests";

function App() {
  const [products, setProducts] = useState(null);
  const [searchParams] = useSearchParams();
  const [minMaxPrice, setMinMaxPrice] = useState([]);
  const [text, setText] = useState(null);
  const [memoryFilter, setMemoryFilter] = useState(null);
  const [screenFilter, setScreenFilter] = useState(null);

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  useEffect(() => {
    const currentPrice = searchParams
      .get("price")
      ?.split("-")
      .map((el) => parseInt(el));
    const currentText = searchParams.get("text");
    const currentMemory = searchParams.get("memory");
    const currentScreen = searchParams.get("screen");
    setMinMaxPrice(currentPrice || []);
    setText(currentText);
    setMemoryFilter(currentMemory);
    setScreenFilter(currentScreen);
  }, [searchParams]);

  const prices = useMemo(() => products?.map((el) => parseInt(el.price)).sort((a, b) => a - b), [products]);

  const memory = useMemo(
    () =>
      Array.from(
        new Set(
          products?.reduce((acc, el, i) => {
            acc[i] = el.description.split("/")[2];
            return acc;
          }, [])
        )
      ),
    [products]
  );

  const screen = useMemo(
    () =>
      Array.from(
        new Set(
          products?.reduce((acc, el, i) => {
            acc[i] = parseFloat(
              el.description
                .split("/")[0]
                .replace(/[^,\d]/gm, "")
                .replace(",", ".")
            );
            return acc;
          }, [])
        )
      ).sort((a, b) => a - b),
    [products]
  );

  const filteredProducts = products?.map((el) => {
    const { price, description, name } = el;
    const intPrice = parseInt(price);
    const memory = description.split("/")[2];
    const screen = description
      .split("/")[0]
      .replace(/[^,\d]/gm, "")
      .replace(",", ".");
    let newElement = true;
    if (minMaxPrice.length > 0) {
      if (intPrice >= minMaxPrice[0] && intPrice <= minMaxPrice[1]) {
        newElement = el;
      } else newElement = undefined;
    }
    if (newElement && text) {
      if (name.toLowerCase().includes(text.toLowerCase())) {
        newElement = el;
      } else newElement = undefined;
    }
    if (newElement && memoryFilter) {
      if (memoryFilter === memory) {
        newElement = el;
      } else newElement = undefined;
    }
    if (newElement && screenFilter) {
      if (screenFilter.includes(screen)) {
        newElement = el;
      } else newElement = undefined;
    }
    if (newElement) {
      const { id, description, img, name, price } = el;
      return (
        <Link to={`/product/${id}`} key={id}>
          <Product description={description} img={img} name={name} price={price} />
        </Link>
      );
    } else return null;
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>
        {filteredProducts?.some((el) => el) ? (
          filteredProducts
        ) : (
          <div className={styles.notFound}>There are no products matching the selected filters</div>
        )}
      </div>
      <div className={styles.filters}>
        <Filters prices={prices} memory={memory} screen={screen} />
      </div>
    </div>
  );
}

export default App;
