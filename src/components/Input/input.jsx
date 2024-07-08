import styles from './input.module.css';

function Input({label, type, name, id, onChange}) {
    return (
        <div className={styles.bg}>
            <label for={name}>{label}</label>
            <input type={type} name={name} id={id} onChange={onChange}/>
        </div>
    )
}

export default Input;