import React from 'react'
import { FormText } from 'reactstrap'
import styles from './authInput.module.scss'

function AuthInput({ className, field, form, ...props }) {
  const isInvalid =
    form && form.errors && form.touched[field.name] && form.errors[field.name]

  return (
    <div
      className={`${styles.Input} ${
        isInvalid ? 'form-errors' : ''
      } ${className}`}
    >
      <input {...field} {...props} />
      {props.placeholder && (
        <span className={styles.placeholder}>{props.placeholder}</span>
      )}
      {isInvalid && <FormText color="danger">{isInvalid}</FormText>}
    </div>
  )
}
export default AuthInput
