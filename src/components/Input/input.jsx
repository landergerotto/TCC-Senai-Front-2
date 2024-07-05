import styles from './input.module.css';

function Input({label, type, name}) {
    return (
        <div className={styles.bg}>
            <label for={name}>{label}</label>
            <input type={type} name={name} />
        </div>
    )
}

export default Input;