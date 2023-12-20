import React from 'react';
import styles from '../../Pages/PrivatePages/MyaHotelEdit/myHotelEdit.module.scss';

function RadioInput({title, value, checked, valueFalse, yes='Есть', no='Нету', onChange}) {
  return (
    <>
      <div className={styles.radioContainer}>
        <div className={styles.radioTitle}>
          <p>
            {title}
          </p>
        </div>
        <section className={styles.radioContainer}>
          <label
            className={`label-box ${checked === true ? 'selected' : ''}`}>
            <input
              type="radio"
              value={value}
              checked={checked === true}
              onChange={onChange}
            />
            <span>{yes}</span>
          </label>
          <label
            className={`label-box ${checked === false ? 'selected' : ''}`}>
            <input
              type="radio"
              value={valueFalse}
              checked={checked === false}
              onChange={onChange}
            />
            <span>{no}</span>
          </label>
        </section>
      </div>
    </>
  );
}
export default RadioInput;
