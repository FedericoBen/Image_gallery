import styles from './ModalImageSelected.module.scss'
import React from "react";

const ModalImageSelected = ({onClick, src, alt}) => {
  return (
    <div className={styles.modal_image_selected} onClick={() => onClick()}>
      <div className={styles.background_modal} />
      <div className={styles.container_image_selected}>
        <img
          src={src}
          alt={alt}
        />
      </div>
    </div>
  );
};

export default ModalImageSelected;
