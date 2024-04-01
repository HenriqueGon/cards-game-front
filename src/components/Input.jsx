import React from 'react';

const Input = ({label, className, id, placeholder, value, onChange, style, required}) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={style}
        required={required}
      />
    </>
  );
}

export default Input;