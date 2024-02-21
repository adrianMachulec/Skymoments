import { useEffect, useRef, useState } from "react";
import styles from "./Slideshow.module.scss";
import { AnimatedImageVert, AnimatedImageHor } from "./styledComponents";

export default function Slideshow(props) {
  const [stime] = useState(20);
  const [timer, setTimer] = useState(stime);

  const [slides, setSlides] = useState([]);
  const [slideNo, setSlideNo] = useState(0);

  const [imgSize, setImgSize] = useState({
    x: 0,
    y: 0,
  });
  const [windowSize, setWindowSize] = useState({
    x: 0,
    y: 0,
  });
  const [offset, setOffset] = useState(0);

  const slideRef = useRef(null);

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
    if (e) e.preventDefault();
    if (dir > 0) {
      slideNo < slides.length - 1 ? setSlideNo(slideNo + dir) : setSlideNo(0);
    } else {
      slideNo > 0 ? setSlideNo(slideNo + dir) : setSlideNo(slides.length - 1);
    }
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

    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setTimer(stime);
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    return () => {
      window.removeEventListener("resize", updateSize);
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setTimer(stime);
    // eslint-disable-next-line
  }, [offset, slideNo]);

  useEffect(() => {
    if (timer === 0) changeSlide(1);
    // eslint-disable-next-line
  }, [timer]);

  useEffect(() => {
    const currentRef = slideRef.current;
    const handleImageLoad = () => {
      setImgSize({
        ...imgSize,
        x: currentRef.width,
        y: currentRef.height,
      });
    };

    if (currentRef) {
      currentRef.addEventListener("load", handleImageLoad);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("load", handleImageLoad);
      }
    };

    // eslint-disable-next-line
  }, [slides]);

  useEffect(() => {
    windowSize.x > windowSize.y
      ? windowSize.y - imgSize.y < 0
        ? setOffset(windowSize.y - imgSize.y)
        : setOffset(0)
      : setOffset(windowSize.x - imgSize.x);

    // eslint-disable-next-line
  }, [imgSize, windowSize]);

  const prevButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-caret-left-fill"
      viewBox="0 0 16 16"
    >
      <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
    </svg>
  );

  const nextButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      className="bi bi-caret-right-fill"
      viewBox="0 0 16 16"
    >
      <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
    </svg>
  );

  return (
    <div className={styles.slideshow}>
      {windowSize.x > windowSize.y ? (
        <AnimatedImageVert
          src={slides[slideNo]}
          alt="zdjęcie pokazowe"
          ref={slideRef}
          key={slideNo}
          offset={offset}
          $stime={stime}
        />
      ) : (
        <AnimatedImageHor
          src={slides[slideNo]}
          alt="zdjęcie pokazowe"
          ref={slideRef}
          key={slideNo}
          offset={offset}
          $stime={stime}
        />
      )}

      <div className={styles.slideshowButtons}>
        <button
          onClick={(e) => changeSlide(-1, e)}
          className={styles.slideshowButtonsButton}
        >
          {prevButtonIcon}
        </button>
        <button
          onClick={(e) => changeSlide(1, e)}
          className={styles.slideshowButtonsButton}
        >
          {nextButtonIcon}
        </button>
      </div>
    </div>
  );
}
