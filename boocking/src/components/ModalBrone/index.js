import React, {useCallback, useEffect, useMemo} from 'react';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'reactstrap';
import {Formik, Form, Field} from 'formik';
import styles from './modalBrone.module.scss';
import InputBron from '../InputBron';
import {useDispatch, useSelector} from 'react-redux';
import * as reservationActions from '../../actions/reservation.actions';
import {useHistory} from 'react-router-dom';

function ModalBrone({bronVisible, searchBronVisible, t}) {
  const dispatch = useDispatch();
  const match = useHistory();
  const reservation = useSelector((state) => state.reservation.reservationInfo);
  const initialValues = useMemo(
      () => ({
        number: '',
        pinCode: '',
      }),
      [],
  );
  useEffect(()=>{
    if (reservation && reservation) {
      match.push(`/reservation/${reservation.id}`, {reservation});
    }
  }, [reservation, match]);
  const onSubmit = useCallback((credentials)=>{
    dispatch(reservationActions.reservationInfo({...credentials}));
  }, [dispatch]);
  return (
    <>
      <Modal show={bronVisible} onHide={searchBronVisible} className={styles.modal}>
        <Modal.Header closeButton={searchBronVisible}>
          <div className={styles.title}>{t('modalBron.title')}</div>
        </Modal.Header>
        <div className={styles.check_reservation}>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {()=>(
              <Form className={styles.form}>
                <Field
                  type="text"
                  name='number'
                  className={styles.input}
                  component={InputBron}
                  placeholder={t('modalBron.number.placeHolder')}
                  title={t('modalBron.number.title')}
                />
                <Field
                  type="text"
                  name='pinCode'
                  className={styles.input}
                  component={InputBron}
                  placeholder={t('modalBron.pinCode.placeHolder')}
                  title={t('modalBron.pinCode.title')}
                />
                <div className="check-reservation__errors"/>
                <Button type="submit" color={'primary'} className={styles.button}>
                  {t('modalBron.button')}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
export default ModalBrone;
