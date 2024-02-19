import { useEffect, useRef, useState } from "react";
import styles from "./Slideshow.module.scss";
import styled, { keyframes, css } from "styled-components";

const moveSlideVert = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-436px);
  }
`;

const moveSlideHor = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-200px);
  }
`;

const animationMoveSlideVert = css`
  animation: ${moveSlideVert} 30s linear infinite;
`;

const animationMoveSlideHor = css`
  animation: ${moveSlideHor} 30s linear infinite;
`;

const AnimatedImageVert = styled.img`
  width: 100%;
  minheight: 100%;
  objectfit: cover;
  position: absolute;
  opacity: 0.7;
  ${animationMoveSlideVert}
`;

const AnimatedImageHor = styled.img`
  height: 100%;
  objectfit: cover;
  position: absolute;
  opacity: 0.7;
  ${animationMoveSlideHor}
`;

export default function Slideshow(props) {
  const [slides, setSlides] = useState([]);
  const [slideNo, setSlideNo] = useState(0);
  const [slideKey, setSlideKey] = useState(1);

  const slideRef = useRef(null);

  const [imgSize, setImgSize] = useState({
    x: 0,
    y: 0,
  });

  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
  });

  const [offset, setOffset] = useState(0);

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
    setSlideKey(slideKey * -1)
  }

  useEffect(() => {
    function updateSize() {
      setWindowSize({
        x: window.innerWidth,
        y: window.innerHeight,
      });

      setImgSize({
        x: slideRef.current.width,
        y: slideRef.current.height,
      });
    }

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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleImageLoad = () => {
      setImgSize({
        ...imgSize,
        x: slideRef.current.width,
        y: slideRef.current.height,
      });
    };

    if (slideRef.current) {
      slideRef.current.addEventListener("load", handleImageLoad);
    }

    return () => {
      if (slideRef.current) {
        slideRef.current.removeEventListener("load", handleImageLoad);
      }
    };

    // eslint-disable-next-line
  }, [slides]);

  const testB = () => {
    console.log("test button");
  };

  useEffect(() => {
    windowSize.x > windowSize.y
      ? windowSize.y - imgSize.y < 0
        ? setOffset(windowSize.y - imgSize.y)
        : setOffset(0)
      : setOffset(windowSize.x - imgSize.x);

    // eslint-disable-next-line
  }, [imgSize, windowSize]);

  useEffect(() => {
    console.log(offset);
  }, [offset]);

  return (
    <div className={styles.slideshow}>
      {windowSize.x > windowSize.y ? (
        <AnimatedImageVert
          src={slides[slideNo]}
          alt="zdjęcie pokazowe"
          ref={slideRef}
          key={slideKey}
        />
      ) : (
        <AnimatedImageHor
          src={slides[slideNo]}
          alt="zdjęcie pokazowe"
          ref={slideRef}
          key={slideKey}
        />
      )}

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
        <p className={styles.slideshowDataP}>offset: {offset}</p>
      </div>
    </div>
  );
}
