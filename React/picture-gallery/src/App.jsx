import React, { useCallback, useEffect, useState } from "react";
import styles from "./App.module.css";
import axios from "axios";
import Image from "./Image/Image";
import SearchForm from "./SearchForm/SearchForm";
import Popup from "./Popup/Popup";
import ShowMoreBtn from "./ShowMoreBtn/ShowMoreBtn";

const CancelToken = axios.CancelToken;
let cancel;

function getImages(search, page) {
  const URL = "https://pixabay.com/api/";
  let images;
  if (cancel !== undefined) cancel();
  images = axios
    .get(URL, {
      cancelToken: new CancelToken((c) => (cancel = c)),
      params: {
        q: search,
        page,
        key: "24495411-41c04712dc965e8293a563105",
      },
    })
    .then((res) => res.data.hits)
    .catch((err) => {
      console.log(err);
      return [];
    });
  return images;
}

function App() {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [popUp, setPopUp] = useState(null);

  useEffect(() => {
    if (search !== null || page !== 1) {
      getImages(search, page).then((images) => {
        setImages((prevImages) => [...prevImages, ...images]);
      });
    }
  }, [search, page]);

  const pageHandler = useCallback(() => {
    setPage((prevPage) => (prevPage += 1));
  }, []);

  const handleSearch = useCallback((query) => {
    setImages([]);
    setSearch(query);
    setPage(1);
  }, []);

  const closePopup = useCallback(() => {
    setPopUp(null);
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <Popup fullSource={popUp} popUpHandler={closePopup} />
      <h1 className={styles.headeeng}>Picture Gallery</h1>
      <div className={styles.galleryWrapper}>
        <SearchForm sendSearch={handleSearch} />
        <div className={styles.picturesWrapper}>
          {images.map((el) => {
            const { webformatURL, largeImageURL, id, tags } = el;
            return <Image previewSource={webformatURL} fullSource={largeImageURL} tags={tags} key={id} popUpHandler={setPopUp} />;
          })}
          <ShowMoreBtn isHidden={images.length < page * 20} pageHandler={pageHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
