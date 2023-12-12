import React, { useCallback, useMemo } from 'react';
import styles from './footer.module.scss';
import foot from '../../assets/hotel/footer.png';
import { Formik, Field, Form } from 'formik';
import { useDispatch } from 'react-redux';
import InputFooter from '../InputFooter';

function Footer() {
  const dispatch = useDispatch();
  const initialValues = useMemo(
    () => ({
      email: '',
    }),
    []
  );
  const onSubmitSignIn = useCallback((credentials) => {}, [dispatch]);
  return (
    <>
      <div className={styles.footerPages}>
        <div className={styles.footerPagesContent}>
          <div className={styles.footerPagesForm}>
            <img src={foot} alt={foot} />
            <Formik initialValues={initialValues} onSubmit={onSubmitSignIn}>
              {() => (
                <Form>
                  <div className={styles.footerForm}>
                    <div className={styles.footerButtonWraper}>
                      <svg
                        fill='#D9CCF8'
                        width={24}
                        height={24}
                        style={{ position: 'absolute' }}
                        focusable='false'
                        aria-hidden='true'>
                        <path d='M12 1.95c-5.52 0-10 4.48-10 10s4.48 10 10 10h5v-2h-5c-4.34 0-8-3.66-8-8s3.66-8 8-8 8 3.66 8 8v1.43c0 .79-.71 1.57-1.5 1.57s-1.5-.78-1.5-1.57v-1.43c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.64-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.97 0 3.5-1.6 3.5-3.57v-1.43c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z' />
                      </svg>
                      <Field
                        type='email'
                        name='email'
                        component={InputFooter}
                        placeholder='Введите email'
                        className={styles.InputFooter}
                      />
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}
export default Footer;
