import styles from './input.module.css';

function Input({label, type, name, id, onChange, style, labelStyle}) {
    return (
        <div className={styles.bg}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            <input type={type} name={name} id={id} onChange={onChange} style={style}/>
        </div>
    )
}

export default Input;