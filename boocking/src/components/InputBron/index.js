import React from 'react';

function InputBron({className, type, name, placeholder, title, field, form, ...props}) {
  return (
    <>
      <input type={type} name={name}
        className={className}
        placeholder={placeholder}
        {...field} {...props}
      />
    </>
  );
}
export default InputBron;
