import { useEffect, useRef, useState } from "react";
import styles from "./Slideshow.module.scss";

export default function Slideshow(props) {
  const [slides, setSlides] = useState([]);
  const [slideNo, setSlideNo] = useState(0);

  const slideRef = useRef(null);

  const [imgSize, setImgSize] = useState({
    x: 0,
    y: 0,
  });

  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
  });

  const [slideStyle, setSlideStyle] = useState({
    width: '100%',
    minHeight: '100%',
    objectFit: 'cover',
    position: 'absolute',
    opacity: '0.7'
  })

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    const tmpSlides = [];
    for (let key in images) {
      tmpSlides.push(images[key]);
    }
    return tmpSlides;
  }

  function changeSlide(dir, e) {
    e.preventDefault();
    if (dir > 0) {
      slideNo < slides.length - 1 ? setSlideNo(slideNo + dir) : setSlideNo(0);
    } else {
      slideNo > 0 ? setSlideNo(slideNo + dir) : setSlideNo(slides.length - 1);
    }
  }

  function updateSize() {
    setWindowSize({
      ...windowSize,
      x: window.innerWidth,
      y: window.innerHeight,
    });

    setImgSize({
      ...imgSize,
      x: slideRef.current.width,
      y: slideRef.current.height,
    });
  }

  useEffect(() => {
    setSlides(
      importAll(
        require.context(
          "../../../assets/images/homepage/slideshow",
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );

    setWindowSize({
      ...windowSize,
      x: window.innerWidth,
      y: window.innerHeight,
    });

    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  useEffect(() => {
    setImgSize({
      ...imgSize,
      x: slideRef.current.width,
      y: slideRef.current.height,
    });
  }, [slides]);

  const testB = () => {
    console.log("test button");
  };

  return (
    <div className={styles.slideshow}>
      <img
        className={styles.slideshowImg}
        src={slides[slideNo]}
        alt="zdjęcie pokazowe"
        ref={slideRef}
        style={slideStyle}
      />
      <div className={styles.slideshowButtons}>
        <button
          onClick={(e) => changeSlide(-1, e)}
          className={styles.slideshowButtonsButton}
        >
          Prev
        </button>
        <button
          onClick={(e) => changeSlide(1, e)}
          className={styles.slideshowButtonsButton}
        >
          Next
        </button>
        <button onClick={testB} className={styles.slideshowButtonsButton}>
          Test
        </button>
      </div>
      <div className={styles.slideshowData}>
        <p className={styles.slideshowDataP}>imgX: {imgSize.x}</p>
        <p className={styles.slideshowDataP}>imgY: {imgSize.y}</p>
        <p className={styles.slideshowDataP}>wX: {windowSize.x}</p>
        <p className={styles.slideshowDataP}>wY: {windowSize.y}</p>
      </div>
    </div>
  );
}
