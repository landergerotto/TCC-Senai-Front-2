import styles from './Input.module.css';

function Input({label, type, name}) {
    return (
        <div className={styles.bg}>
            <label for={name}>{label}</label>
            <input type={type} name={name} />
        </div>
    )
}

export default Input;