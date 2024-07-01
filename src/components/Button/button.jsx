import styles from './button.module.css'

function Button({ text, type, onClick }) {
    return (
            <div className={type == "cancel" ? styles.buttonCancelBg : styles.buttonBg} onClick={onClick}>
                {text}
            </div>
    )
}

export default Button;
