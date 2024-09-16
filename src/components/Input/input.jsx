/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./input.module.css";

function Input({
  label,
  type,
  name,
  id,
  onChange,
  onBlur,
  style,
  labelStyle,
  fieldStyle,
  bgStyle,
  select = false,
  options = [],
  disabled = false,
  defaultValue = "",
  placeholder
}) {
  const [value, setValue] = useState(
    defaultValue || localStorage.getItem(name) || ""
  );

  useEffect(() => {
    localStorage.setItem(name, value);
  }, [name, value]);

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e);
  };

  return (
    <div className={styles.bg} style={bgStyle}>
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      {select ? (
        <select
          name={name}
          id={id}
          onChange={handleChange}
          style={style}
          value={value}
          onBlur={onBlur}
        >
          <option value="" disabled>
            Selecione
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value} style={style}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          style={style}
          value={value}
          onBlur={onBlur}
          disabled={disabled}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

export default Input;
