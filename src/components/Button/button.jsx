import styles from './button.module.css'

function Button({ text, type, onClick, style }) {
    const buttonClass = type == "cancel" ? styles.buttonCancelBg : styles.buttonBg;

    return (
         <div className={`${buttonClass} ${style}`} onClick={onClick}>
            <div className={styles.text}>
                {text}
            </div>
        </div>
    )
}

export default Button;
