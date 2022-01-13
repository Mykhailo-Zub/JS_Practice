import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "./App.module.css";
import Filters from "./components/Filters/Filters";
import Product from "./components/Product/Product";

const products = [
  {
    about:
      "Apple iPhone 13 Pro Max – за межами мрій\nКращі камери, преміальні матеріали корпусу, запаморочливий дисплей і збільшена тривалість роботи від батареї. Новий Apple iPhone 13 Pro Max зможе стати кращим смартфоном і його передовий чіп A15 Bionic у цьому допоможе. Чудове оснащення новинки дозволяє вам повноцінно розважатися, працювати, творити і пізнавати світ зі збільшеною продуктивністю. Об'єднуйте його з іншими аксесуарами Apple, і ваше життя стане ще зручніше.",
    screen: 6.7,
    resolution: "2778х1284",
    memory: 1024,
    CPU: "Apple A15 Bionic",
    id: "1",
    img: "https://cdn.comfy.ua/media/catalog/product/i/p/iphone_13_pro_max_q421_gold_pdp_image_position-1a__ww-ru_1.jpg",
    name: "Apple iPhone 13 Pro Max 1Tb Gold",
    price: 61999,
  },
  {
    about:
      "Готуйтеся до\nвідкриттів\nВін має все, що тільки можна очікувати від захищеного смартфона класу преміум з підтримкою 5G.1 Але ми пішли ще далі — його екран розгортається, відкриваючи небачені раніше можливості для перегляду, роботи та розваг.",
    screen: 7.6,
    resolution: "2208х1768",
    memory: 512,
    CPU: "Qualcomm Snapdragon 888",
    id: "2",
    img: "https://cdn.comfy.ua/media/catalog/product/s/m/sm-f926_zfold3_5g_openfront115_phantomblack_210601_1_.jpg",
    name: "Samsung Galaxy Z Fold 3 12/512Gb Phantom Black",
    price: 52999,
  },
  {
    about:
      'Легендарный. Во всех отношениях\nПредставляем смартфон Galaxy S21 Ultra 5G. Уникальные камеры — это революция в области фотографии, с помощью которых вы сможете снимать 8К видео кинематографического качества и превращать каждый кадр в эпические фотоснимки — и все это можно делать просто "на ходу". А сочетание сверхбыстрого 5-нм процессора Galaxy, прочного стеклянного корпуса, батареи на целый день работы и поддержка сетей 5G полностью оправдывает его название — Ultra.',
    screen: 6.8,
    resolution: "3200x1440",
    memory: 256,
    CPU: "Exynos 2100",
    id: "3",
    img: "https://cdn.comfy.ua/media/catalog/product/1/7/1725095_2.jpg",
    name: "Samsung Galaxy S21 Ultra 12/256Gb Phantom Black",
    price: 32999,
  },
  {
    about:
      "Первым соединив электронное перо и смартфон, Galaxy Note открывает для вас абсолютно новый мир. Мы сталкиваемся с новой реальностью, в которой нужны устройства нового типа. Это не смартфон в привычном представлении. Это мощный компьютер в вашем кармане. Это новый уровень развлечений и гейминга. Это киностудия с камерой 8K в ваших руках.\nСупермощный смартфон, меняющий ваше представление о работе и развлечениях.\nЭто Galaxy Note20",
    screen: 6.7,
    resolution: "1920х1080",
    memory: 256,
    CPU: "Exynos 990",
    id: "4",
    img: "https://cdn.comfy.ua/media/catalog/product/s/a/samsung_galaxy_note_20_8_256gb_gray_sm-n980fzagsek__2.jpg",
    name: "Samsung Galaxy Note 20 8/256Gb Gray",
    price: 25999,
  },
  {
    about:
      "Кіномагія\n108 Мп потрійна камера з 8K HDR10 відеозаписом / 120 Гц плоский AMOLED дисплей / Флагманський процесор Snapdragon 888 / Звук від Harman Kardon / Потужна батарея 5000 мАг / Надшвидка 120 Вт зарядка (в комплекті)\n\n120 Гц AMOLED екран\n6.67 дюймовий плоский AMOLED дисплей з частотою оновлення до 120 Гц і 480 Гц швидкістю реакції екрану дає перевагу в іграх і при перегляді улюблених блокбастерів.\nА завдяки True Color і 10-бітній технології, екран відображає понад 1 мільярд кольорів, що забезпечує професійну точність передачі кольору.",
    screen: 6.67,
    resolution: "2400х1080",
    memory: 256,
    CPU: "Qualcomm Snapdragon 888",
    id: "5",
    img: "https://cdn.comfy.ua/media/catalog/product/k/3/k3s-wh_8_.jpg",
    name: "Xiaomi 11T Pro 8/256Gb Moonlight White",
    price: 19999,
  },
];

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [validSearchParams, setValidSearchParams] = useState({});

  const [minPrice, maxPrice] = useMemo(() => {
    const allPrices = products?.map((el) => parseInt(el.price)).sort((a, b) => a - b);
    return [allPrices[0], allPrices[allPrices.length - 1]];
  }, []);

  const memory = useMemo(() => Array.from(new Set(products?.map((el) => el.memory))), []);

  const screen = useMemo(() => Array.from(new Set(products?.map((el) => el.screen))).sort((a, b) => a - b), []);

  useEffect(() => {
    const currentPriceArr = searchParams.get("price")?.split("-");
    if (currentPriceArr && currentPriceArr.length === 2 && currentPriceArr.every((el) => !el.match(/\D/gm))) {
      const [min, max] = currentPriceArr.map((el) => parseInt(el));
      if (min <= max) {
        setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, price: [min, max] }));
      } else {
        setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, price: undefined }));
      }
    } else {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, price: undefined }));
    }
    const currentText = searchParams.get("text");
    if (currentText) {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, text: currentText }));
    } else {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, text: undefined }));
    }
    const currentMemory = parseInt(searchParams.get("memory"));
    if (memory && memory.find((el) => el === currentMemory)) {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, memory: currentMemory }));
    } else {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, memory: undefined }));
    }
    const currentScreen = searchParams.get("screen");
    if (
      currentScreen &&
      currentScreen
        .split(" ")
        .map((el) => parseFloat(el))
        .some((el) => screen.find((elem) => elem === el))
    ) {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, screen: currentScreen }));
    } else {
      setValidSearchParams((prevSearchParams) => ({ ...prevSearchParams, screen: undefined }));
    }
  }, [searchParams, memory, screen]);

  const saveSearchParams = useCallback(
    (params) => {
      setSearchParams(params);
    },
    [setSearchParams]
  );

  const filteredProducts = products?.filter((el) => {
    const { price: minMaxPrice = [], text, memory: memoryFilter, screen: screenFilter } = validSearchParams;
    const { price, screen, memory, name } = el;
    const intPrice = parseInt(price);
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
      return el;
    }
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.products}>
        {filteredProducts?.length > 0 ? (
          filteredProducts?.map((el) => {
            const { id, screen, resolution, memory, CPU, img, name, price } = el;
            return <Product key={id} img={img} name={name} price={price} screen={screen} resolution={resolution} memory={memory} cpu={CPU} />;
          })
        ) : (
          <div className={styles.notFound}>There are no products matching the selected filters</div>
        )}
      </div>
      <div className={styles.filters}>
        <Filters
          minPrice={minPrice}
          maxPrice={maxPrice}
          memory={memory}
          screen={screen}
          searchParams={validSearchParams}
          saveSearchParams={saveSearchParams}
        />
      </div>
    </div>
  );
}

export default App;
