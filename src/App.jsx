import { useState } from "react";
import styles from "./App.module.scss";
import ImagesContainer from "./components/ImagesContainer/ImagesContainer";
import ModalImageSelected from "./components/ModalImageSelected/ModalImageSelected";
import usePexeles from "./hooks/usePexeles/usePexeles";
import Loading from "./components/Loading/Loading";

function App() {
  const { data: imageList, loading, error } = usePexeles();
  const [imageSelected, setImageSelected] = useState(null);

  return (
    <div className={styles.container_app}>
      {imageSelected && (
        <ModalImageSelected
          className={styles.modal_image_selected}
          onClick={() => setImageSelected(null)}
          src={imageSelected.src.original}
          alt="Selected image"
        />
      )}
      {error ? (
        <h1>Algo ha ocurrido trata de recargar nuevamente</h1>
      ) : (
        <div className={styles.container_gallery}>
          {loading ? (
            <Loading/>
          ) : (
            imageList?.map(({ src, photographer, id }) => (
              <ImagesContainer
                onClick={() => setImageSelected(imageList.find((element) => element.id == id))}
                className={styles.container_image}
                key={id}
                src={src.portrait}
                alt={photographer}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
