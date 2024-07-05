import styles from './Button.module.css'

function Button({ text, type, onClick, style }) {
    return (
        <div className={type == "cancel" ? styles.buttonCancelBg : styles.buttonBg} onClick={onClick} style={style}>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default Button;
