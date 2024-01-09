import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import * as actions from '../../actions/auth.actions'
import {
  isValidEmail,
  isValidPassword,
  isValidPhone,
  isValidUsername,
} from '../../utils'
import styles from './authModal.module.scss'
import { Button, Col, Row } from 'reactstrap'
import AuthInput from '../AuthInput'
import InputPhone from '../InputPhone'

function ModalAuth({ modalAuthVisible, authVisible, location }) {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()
  const [tabActive, setTabsActive] = useState(true)

  const initialValues = useMemo(
    () => ({
      username: '',
      password: '',
    }),
    [],
  )

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('username', t('signInPage.inputs.username.error'), (value) =>
            isValidUsername(value),
          ),
        password: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('password', t('signInPage.inputs.password.error'), (value) =>
            isValidPassword(value),
          ),
      }),
    [t],
  )

  const validationSchemaSignUp = useMemo(
    () =>
      yup.object().shape({
        referral: yup.string(),
        first_name: yup.string().required('signInPage.inputs.password.error'),
        last_name: yup.string().required('signInPage.inputs.password.error'),
        phone: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('phone', t('signInPage.inputs.password.error'), (value) =>
            isValidPhone(value),
          ),
        username: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('username', t('signInPage.inputs.username.error'), (value) =>
            isValidUsername(value),
          ),
        email: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('email', t('signInPage.inputs.username.error'), (value) =>
            isValidEmail(value),
          ),
        password: yup
          .string()
          .required('signInPage.inputs.password.error')
          .test('password', t('signInPage.inputs.password.error'), (value) =>
            isValidPassword(value),
          ),
        repeatPassword: yup
          .string()
          .required('signInPage.inputs.password.error')
          .oneOf(
            [yup.ref('password'), null],
            t('signInPage.inputs.password.error'),
          ),
      }),
    [t],
  )

  const referralName = useMemo(() => {
    let referral = ''
    if (location) {
      const searchParams = new URLSearchParams(location.search)
      const ref = searchParams.get('ref')
      if (ref) {
        referral = ref
      }
    }
    return referral
  }, [location])

  const initialValuesSignUp = useMemo(
    () => ({
      phone: '',
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      referral: referralName,
      acceptPrivacyPolicy: false,
    }),
    [referralName],
  )

  const getInviterByName = useCallback(
    (name) => {
      dispatch(actions.inviter({ username: name }))
    },
    [dispatch],
  )

  useEffect(() => {
    if (referralName) {
      getInviterByName(referralName)
    }
    return () => {
      dispatch(actions.clearInviter())
    }
  }, [dispatch, referralName, getInviterByName])

  const handleOnBlurReferralField = (event) => {
    const inviterName = event.target.value
    if (inviterName) {
      getInviterByName(inviterName)
    } else {
      dispatch(actions.clearInviter())
    }
  }

  const onSubmit = useCallback(
    (credentials) => {
      if (tabActive === true) {
        dispatch(actions.signIn({ ...credentials }))
        modalAuthVisible()
      } else {
        dispatch(actions.signUp({ ...credentials }))
        modalAuthVisible()
      }
    },
    [dispatch, modalAuthVisible, tabActive],
  )

  return (
    <>
      <Modal show={authVisible} onHide={modalAuthVisible}>
        <Modal.Header closeButton={modalAuthVisible}>
          <Modal.Title>
            {tabActive ? 'Войдите в личный кабинет' : 'Зарегистрироваться'}
          </Modal.Title>
        </Modal.Header>
        <Formik
          initialValues={tabActive ? initialValues : initialValuesSignUp}
          onSubmit={onSubmit}
          validationSchema={
            tabActive ? validationSchema : validationSchemaSignUp
          }
        >
          {() => (
            <Form>
              <div className={styles.authFormTabs}>
                <div
                  className={
                    tabActive ? styles.authFormTabActive : styles.authFormTab
                  }
                  onClick={() => setTabsActive(true)}
                  data-auth-tab-id="login-d"
                >
                  <span> Войти </span>
                </div>
                <div
                  className={
                    tabActive ? styles.authFormTab : styles.authFormTabActive
                  }
                  onClick={() => setTabsActive(false)}
                  data-auth-tab-id="login-d"
                >
                  <span> Зарегистрироваться </span>
                </div>
              </div>
              <div className={styles.authFormTabsContent}>
                {tabActive ? (
                  <>
                    <Field
                      type="text"
                      name="username"
                      component={AuthInput}
                      className={styles.inputField}
                      placeholder="Введите логин"
                    />
                    <Field
                      type="password"
                      name="password"
                      component={AuthInput}
                      className={styles.inputField}
                      placeholder="Введите логин"
                    />
                  </>
                ) : (
                  <>
                    <Field
                      type="text"
                      name="referral"
                      placeholder={t('Логин пригласилеля Не обязательно')}
                      onBlur={handleOnBlurReferralField}
                      className={styles.inputField}
                      component={AuthInput}
                    />
                    <section className={styles.inputField}>
                      <Row>
                        <Col xl={6}>
                          <Field
                            type="text"
                            name="first_name"
                            placeholder={t('Имя')}
                            component={AuthInput}
                          />
                        </Col>
                        <Col xl={6}>
                          <Field
                            type="text"
                            name="last_name"
                            placeholder={t('Фамилия')}
                            component={AuthInput}
                          />
                        </Col>
                      </Row>
                    </section>
                    <Field
                      name="phone"
                      placeholder={t('Телефон')}
                      className={styles.inputField}
                      component={InputPhone}
                    />
                    <section className={styles.inputField}>
                      <Row>
                        <Col xl={6}>
                          <Field
                            type="text"
                            name="username"
                            placeholder={t('Придумайте логин')}
                            component={AuthInput}
                          />
                        </Col>
                        <Col xl={6}>
                          <Field
                            type="text"
                            name="email"
                            placeholder={t('email')}
                            component={AuthInput}
                          />
                        </Col>
                      </Row>
                    </section>
                    <section className={styles.inputField}>
                      <Row>
                        <Col xl={6}>
                          <Field
                            type="password"
                            name="password"
                            placeholder={t('Придумайте пароль')}
                            component={AuthInput}
                          />
                        </Col>
                        <Col xl={6}>
                          <Field
                            type="password"
                            name="repeatPassword"
                            placeholder={t('Повторите пароль')}
                            component={AuthInput}
                          />
                        </Col>
                      </Row>
                    </section>
                  </>
                )}
              </div>
              <Modal.Footer>
                <Button type="submit" block color={'primary'}>
                  {tabActive ? 'Войти' : 'Зарегистрироваться'}
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  )
}
export default ModalAuth
