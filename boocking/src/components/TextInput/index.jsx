import React, { useRef } from 'react'
import { Field } from 'formik'
import InputHotel from '../InputHotel'
import styles from './input.module.scss'
function TextInput({ title, name, subTitle }) {
  const pRef = useRef()
  return (
    <>
      <section className={styles.wrapperTextarea}>
        <p className={styles.descriptionTextarea} ref={pRef}>
          {title}
        </p>
        <p className={styles.descriptionTextarea} ref={pRef}>
          {subTitle}
        </p>
        <Field
          heightTextarea={pRef.current?.clientHeight}
          name={name}
          className={styles.textarea}
          placeholder={subTitle}
          component={InputHotel}
        />
      </section>
    </>
  )
}
export default TextInput
