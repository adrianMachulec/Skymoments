import styles from "./AboutMe.module.scss";
import myImg from "../../assets/images/wiki/wiki2.jpg";

export default function AboutMe(props) {
  return (
    <div className={styles.aboutMe}>
      <div className={styles.aboutMeContainer}>
        <div className={styles.aboutMeContainerPhotoContainer}>
          <div className={styles.aboutMeContainerPhotoContainerQuote}>
            <p className={styles.aboutMeContainerPhotoContainerQuoteP}>
              "Nie chodzi o to, na co patrzymy, lecz co widzimy." - Henry David
              Thoreau
            </p>
          </div>
          <img
            className={styles.aboutMeContainerPhotoContainerPhoto}
            src={myImg}
            alt="zdjęcie"
          />
        </div>
        <div className={styles.aboutMeContainerTextContainer}>
          <div className={styles.aboutMeContainerTextContainerH}>
            <div className={styles.aboutMeContainerTextContainerHDivL}></div>
            <div className={styles.aboutMeContainerTextContainerHLine}></div>
            <div className={styles.aboutMeContainerTextContainerHDivR}></div>
          </div>
          <article className={styles.aboutMeContainerTextContainerP}>
            <p>Cześć!</p>
            <p>
              Nazywam się Wiktoria i chciałabym Was zaprosić do mojego świata
              fotografii, świata pięknych obrazów i magicznie niebiańskich
              momentów. Fotografia to moja pasja ale oprócz niej lubię wiele
              innych rzeczy.
            </p>
            <p>
              W wolnym czasie gram w siatkówkę, chodzę na długie, leśne spacery
              , ćwiczę na siłowni oraz słucham muzyki. Uwielbiam zwierzęta,
              patrzenie w gwiazdy, podróżowanie, spotkania ze znajomymi, górskie
              wycieczki i wieczory przy ognisku.
            </p>
            <p>
              Najważniejsza w życiu dla mnie jest rodzina. Mam troje młodszego
              rodzeństwa, którzy są dla mnie całym światem i uwielbiam spędzać z
              nimi czas. Zabawy w piaskownicy, skakanie na trampolinie,
              rysowanie czy nawet zabawa w chowanego sprawiają nam mnóstwo
              radości a im dają cudowny szczery uśmiech. Lubimy też chodzić na
              spacery z naszymi dwoma pieskami: owczarkiem i yorkiem.
            </p>
            <p>
              Jestem osobą, która marzy o romantycznej miłości. Bardzo
              chciałabym przeżyć taniec w deszczu z ukochaną osobą, lot balonem
              czy po prostu płynąć łódka przy zachodzie słońca. Marzę o
              wybudowaniu domu przy lesie, który będzie ostoją dla moich
              bliskich. Chciałabym mieć też dużo zwierząt m.in. byłyby tam psy,
              koty, króliki, kury i krowa.
            </p>
            <p>
              Na codzien jestem optymistką i staram się zawsze doszukiwać
              pozytywnych aspektów danej sytuacji. Jestem osoba, która ma zawsze
              uśmiech na twarzy i stara sie zarazić nim innych. Dbam o relacje
              podczas sesji. Uważam, że musicie sie czuć przy mnie swobodnie i
              naturalnie, dlatego staram się aby atmosfera była zawsze luźna i
              wesoła.
            </p>
            <p>
              W roku 2019 ukończyłam kurs w Akademii Fotografii w Krakowie i od
              tego momentu rozpoczęła sie moja podróż z fotografią. Styl mojej
              fotografii myślę, że można skategoryzować przede wszystkim do
              miana naturalności. Połaczenie pasji z doświadczeniem i
              profesjonalmym sprzętem owocuje zdjęciami, które przywołują
              najpiekniejsze wspomnienia jakie zostały uchwycone w danej
              chwili... chwili, która staje się ponadczasowym przeżyciem.
            </p>
          </article>
          <div className={styles.aboutMeContainerTextContainerH}>
            <div className={styles.aboutMeContainerTextContainerHDivL}></div>
            <div className={styles.aboutMeContainerTextContainerHLine}></div>
            <div className={styles.aboutMeContainerTextContainerHDivR}>
              Instagram prywatny
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
