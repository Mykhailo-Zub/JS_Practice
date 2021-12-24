import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import styles from "./App.module.css";
import Filters from "./components/Filters/Filters";
import Product from "./components/Product/Product";
import { getAllProducts } from "./requests";

function App() {
  const [products, setProducts] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const prices = useMemo(() => products?.map((el) => parseInt(el.price)).sort((a, b) => a - b));

  console.log(products);
  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>
        {products?.map((el) => {
          const { id, description, img, name, price } = el;
          return (
            <Link to={`/product/${id}`} key={id}>
              <Product description={description} img={img} name={name} price={price} />
            </Link>
          );
        })}
      </div>
      <div className={styles.filters}>
        <Filters prices={prices} />
      </div>
    </div>
  );
}

export default App;
