import React from 'react';
import styles from './numberChoice.module.scss';
import {Form} from 'reactstrap';
import DatePicker, {registerLocale} from 'react-datepicker';
import ru from 'date-fns/locale/ru';
registerLocale('ru', ru);


function NumberChoice({setEndDates, endDates, setStartDate, startDate}) {
  return (
    <>
      <section className={styles.numberChoiceContainer}>
        <div className={styles.numberChoiceTitle}>
                   Выбор номера:
        </div>
        <Form className={styles.numberChoiceForm}>
          <article className={styles.dtaPicker}>
            <svg fill="#0094FF"
              width="24"
              height='24'
              focusable="false"
            >
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
            <DatePicker
              locale="ru"
              selected={startDate}
              placeholderText="Дата Заезда"
              onChange={(date) => setStartDate(date)}
            />
          </article>
          <article className={styles.dtaPicker}>
            <svg fill="#0094FF"
              width="24"
              height='24'
              focusable="false"
            >
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
            </svg>
            <DatePicker
              locale="ru"
              selected={endDates}
              placeholderText="Дата Выезда"
              onChange={(date) => setEndDates(date)}
            />
          </article>
          <article className={styles.dtaPicker}>
            <svg
              width="18"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="#0094FF"/>
            </svg>
            <select id="formatr" >
              <option value="" disabled selected hidden>Количество Гостей</option>
              <option value="1" >1</option>
              <option value="2" >2</option>
              <option value="3" >3</option>
              <option value="4">4</option>
            </select>
          </article>
        </Form>
      </section>
    </>
  );
}
export default NumberChoice;
