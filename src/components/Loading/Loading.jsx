import styles from "./Loading.module.css";

function Loading() {
  return (
    <div className={styles.background}>
      <div className={styles.loader}></div>
    </div>
  );
}

export default Loading;
