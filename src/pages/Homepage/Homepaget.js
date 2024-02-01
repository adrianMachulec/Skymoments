import { useEffect, useRef, useState } from "react";
import styles from "./Homepaget.module.scss";

export default function Homepaget(props) {

  const [imgTab, setImgTab] = useState([]);
  const [slideNo, setSlideNo] = useState(0);

  const [imgH, setImgH] = useState(0);
  const [windowH, setWindowH] = useState(0);
  const [imgOffset, setImgOffset] = useState(100)

  const [ms, setMs] = useState(0);
  const imgRef = useRef(null);

  function importAll(r) {
    let images = {};
    r.keys().forEach((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    const tmpImgTab = [];
    for (let key in images) {
      tmpImgTab.push(images[key]);
    }
    return tmpImgTab;
  }

  const getImgH = () => {
    if (imgRef.current && imgRef.current.complete) {
      const imgHeight = imgRef.current.height;
      setImgH(imgHeight);
    }
  };

  const handleResize = () => {
    setWindowH(window.innerHeight);
  };

  const getImgOffset = () => {
    console.log(imgH)
    console.log(windowH)
    console.log(imgOffset)
  }

  useEffect(() => {
    setImgTab(
      importAll(
        require.context(
          "../../assets/images/homepage/slideshow",
          false,
          /\.(png|jpe?g|svg)$/
        )
      )
    );

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.addEventListener("load", getImgH);
    }
    getImgH();
    handleResize()
  }, [imgTab]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("This will run every second!");
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  const nextImg = (e) => {
    e.preventDefault();
    slideNo < imgTab.length - 1 ? setSlideNo(slideNo + 1) : setSlideNo(0);
  };

  const prevImg = (e) => {
    e.preventDefault();
    slideNo > 0 ? setSlideNo(slideNo - 1) : setSlideNo(imgTab.length - 1);
  };

  const testButton = (e) => {
    e.preventDefault();
    getImgOffset()
  };

  const positionStyles = {
    bottom: `calc(${windowH}px - ${imgH}px + ${imgOffset})`
  };

  return (
    <div className={styles.homepaget}>
      <div className={styles.slideshow}>
        <img
          ref={imgRef}
          key={slideNo}
          className={styles.slideshowImg}
          src={imgTab[slideNo]}
          alt="img1"
          style={positionStyles}
        />
        <div className={styles.slideshowButtons}>
          <button onClick={prevImg} className={styles.slideshowButtonsButton}>
            Prev
          </button>
          <button onClick={nextImg} className={styles.slideshowButtonsButton}>
            Next
          </button>
          <button
            onClick={testButton}
            className={styles.slideshowButtonsButton}
          >
            Test
          </button>
        </div>
      </div>
      Homepaget
    </div>
  );
}
