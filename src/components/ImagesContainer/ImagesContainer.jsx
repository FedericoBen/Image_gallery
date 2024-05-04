import styles from "./ImagesContainer.module.scss";

const ImagesContainer = ({ id, src, alt, onClick }) => {
  return (
    <label
      onClick={() => onClick(id)}
      className={styles.container_image}
      key={id}
    >
      <img src={src} alt={alt} />
    </label>
  );
};

export default ImagesContainer;
