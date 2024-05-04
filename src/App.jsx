import { useEffect, useState } from "react";
import { createClient } from "pexels";
import styles from "./App.module.scss";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer";
import ModalImageSelected from "./components/ModalImageSelected/ModalImageSelected";

const client = createClient(import.meta.env.VITE_PEXELES_KEY);
const query = "Nature";

function App() {
  const [imageList, setImageList] = useState([]);

  const selectImage = (id) =>
    setImageList(
      imageList.map((element) => ({ ...element, checked: element.id == id }))
    );

  const closeModal = () =>
    setImageList(imageList.map((element) => ({ ...element, checked: false })));

  const callPexeles = async () => {
    try {
      const { photos } = await client.photos.search({
        query,
        per_page: 15,
        page: 1,
      });
      setImageList([...photos] || []);
    } catch (error) {
      console.error("Error call pexeles", error);
    }
  };
  useEffect(() => {
    callPexeles();
  }, []);

  return (
    <div className={styles.container_app}>
      {imageList.some((element) => element.checked) && (
        <ModalImageSelected
          className={styles.modal_image_selected}
          onClick={() => closeModal()}
          src={imageList.find((element) => element.checked).src.original}
          alt="Selected image"
        />
      )}
      <div className={styles.container_gallery}>
        {imageList.map(({ src, photographer, id }) => (
          <ImagesContainer
            onClick={() => selectImage(id)}
            className={styles.container_image}
            key={id}
            src={src.original}
            alt={photographer}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
