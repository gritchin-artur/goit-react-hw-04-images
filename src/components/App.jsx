import { useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import Button from "./Button/Button";
import ImageGallery from "./ImageGallery/ImageGallery";
import Loader from "./Loader/Loader";
import SearchBar from "./SearchBar/SearchBar";
import Modal from "./Modal/Modal";

import fetchApi from "./fetch/fetch";
import { GlobalStyled } from "./createGlobalStyle/createGlobalStyle";

export function App() {
  const [topic, setTopic] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [alt, setAlt] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!topic) return;
    async function componentDidUpdate() {
      setStatus("pending");
      try {
        const { hits: imagesHits, total: totalHits } = await fetchApi(
          topic,
          page
        );
        console.log(totalHits);
        if (!imagesHits.length) {
          Notify.failure(
            "No results were found for your search, please try something else."
          );
        }
        setImages((images) => [...images, ...imagesHits]);
        setStatus("resolved");
        setTotalHits();
      } catch (error) {
        setStatus("rejected");
        setError("Something went wrong");
      }
    }
    componentDidUpdate();
  }, [topic, page]);

  // click to button seach
  const handleFormSubmit = (topic) => {
    setTopic(topic);
    setPage(1);
    setImages([]);
  };

  // click button load more
  const loadMore = () => setPage((prevState) => prevState + 1);

  // modal imag
  const handleSelectedImage = (largeImageUrl, tags) => {
    setSelectedImage(largeImageUrl);
    setAlt(tags);
    setShowModal(true);
  };

  // click button close modal
  const closeModal = () => {
    setSelectedImage("");
    setAlt("");
    setShowModal(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleFormSubmit} />
      {status === "pending" && <Loader />}
      {error && (
        <h1 style={{ color: "orangered", textAlign: "center" }}>{error}</h1>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} selectedImage={handleSelectedImage} />
      )}
      {images.length !== totalHits && status === "resolved" && (
        <Button onClick={loadMore} />
      )}
      {showModal && (
        <Modal selectedImage={selectedImage} tags={alt} onClose={closeModal} />
      )}
      <GlobalStyled />
    </>
  );
}
