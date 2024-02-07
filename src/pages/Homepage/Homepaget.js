import styles from "./Homepaget.module.scss";
import Slideshow from "./Slideshow/Slideshow";

export default function Homepaget(props) {
  return (
    <div className={styles.homepaget}>
      <Slideshow />
      Homepaget
    </div>
  );
}
