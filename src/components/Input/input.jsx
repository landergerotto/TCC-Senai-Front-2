import { useEffect, useState } from 'react';
import styles from './input.module.css';

function Input({ label, type, name, id, values, onChange, style, labelStyle, select = false, options = [] }) {
    const [value, setValue] = useState(localStorage.getItem(name) || '');

    useEffect(() => {
        localStorage.setItem(name, value);
    }, [name, value]);

    const handleChange = (e) => {
        setValue(e.target.value);
        onChange(e);
    };

    return (
        <div className={styles.bg}>
            <label htmlFor={name} style={labelStyle}>{label}</label>
            {select ? (
                <select name={name} id={id} onChange={handleChange} style={style} value={value} >
                    <option value="" disabled>Selecione</option>
                    {options.map((option, index) => (
                        <option key={index} value={option.value} style={style}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input type={type} name={name} id={id} onChange={handleChange} style={style} value={value} />
            )}
        </div>
    );
}

export default Input;
