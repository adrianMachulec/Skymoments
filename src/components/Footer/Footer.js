import styles from "./Footer.module.scss";

export default function Footer(props) {
  return (
    <div className={styles.footer}>
      <div className={styles.footerBox}>
        <p>Kontakt:</p>
        <p>+48 729 882 140</p>
        <p>wiktoriaspisak00@gmail.com</p> 
      </div>
      <div className={styles.footerBox}>Copyright Sky Moments 2024</div>
    </div>
  );
}
