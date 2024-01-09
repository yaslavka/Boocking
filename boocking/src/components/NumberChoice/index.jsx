import React from 'react'
import styles from './numberChoice.module.scss'
import { Button, Form } from 'reactstrap'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
//import dayjs from 'dayjs'
import 'dayjs/locale/ru'

function NumberChoice({
  setEndDates,
  //endDates,
  setStartDate,
  //startDate,
  setGo,
}) {
  const reset = () => {
    setStartDate('')
    setEndDates('')
    setGo(0)
  }
  return (
    <>
      <section className={styles.numberChoiceContainer}>
        <div className={styles.numberChoiceTitle}>Выбор номера:</div>
        <Form className={styles.numberChoiceForm}>
          <article className={styles.dtatPicker}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'ru'}
            >
              <DemoContainer components={['MobileDateTimePicker']}>
                <MobileDateTimePicker
                  views={[
                    'day',
                    'month',
                    'year',
                    'hours',
                    'minutes',
                    'seconds',
                  ]}
                  label="Дата Заезда"
                  onChange={setStartDate}
                />
              </DemoContainer>
            </LocalizationProvider>
          </article>
          <article>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale={'ru'}
            >
              <DemoContainer components={['MobileDateTimePicker']}>
                <MobileDateTimePicker
                  views={[
                    'day',
                    'month',
                    'year',
                    'hours',
                    'minutes',
                    'seconds',
                  ]}
                  locale="ru"
                  label="Дата Выезда"
                  onChange={setEndDates}
                />
              </DemoContainer>
            </LocalizationProvider>
          </article>
          <article className={styles.dtaPicker}>
            <svg
              width="18"
              height="18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z"
                fill="#0094FF"
              />
            </svg>
            <select id="formatr" onChange={(e) => setGo(e.target.value)}>
              <option value="" disabled selected hidden>
                Количество Гостей
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </article>
          <Button color={'primary'} onClick={reset}>
            Сбросить
          </Button>
        </Form>
      </section>
    </>
  )
}
export default NumberChoice
