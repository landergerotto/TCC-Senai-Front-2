import styles from './input.module.css';

function Input({ label, type, name, id, onChange, style, labelStyle, select = false, options = [] }) {
    return (
        <div className={styles.bg}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            {select ? (
                <select name={name} id={id} onChange={onChange} style={style}>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} style={style}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input type={type} name={name} id={id} onChange={onChange} style={style} />
            )}
        </div>
    );
}

export default Input;