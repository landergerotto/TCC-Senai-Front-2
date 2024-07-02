import styles from './button.module.css'

function Button({ text, type, onClick }) {
    return (
        <div className={type == "cancel" ? styles.buttonCancelBg : styles.buttonBg} onClick={onClick}>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default Button;
