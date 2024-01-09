import React, { useEffect } from 'react'
import styles from './messge.module.scss'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'reactstrap'
import LeftSide from '../../../components/LeftSide'
import RightSide from '../../../components/RightSide'
import PrivateNavbar from '../../../components/PrivateNavbar'
import * as messageActions from '../../../actions/message.actions'

function MessagePages() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { t } = useTranslation('common')
  const userInfo = useSelector((state) => state.app.user)
  const messages = useSelector((state) => state.messages.messages)
  const authId = userInfo && userInfo
  useEffect(() => {
    dispatch(messageActions.messageInfo(authId?.id))
  }, [dispatch, authId?.id])
  return (
    <>
      {userInfo && (
        <PrivateNavbar>
          <Row className={styles.message}>
            <Col
              xl={3}
              className={`${styles.borderRight}`}
              style={{ padding: 0 }}
            >
              <LeftSide
                messages={messages}
                authId={userInfo.id}
                userInfo={userInfo}
              />
            </Col>
            <Col
              xl={8}
              className={styles.borderRightC}
              style={{ padding: 0, width: '75%' }}
            >
              {id === undefined ? (
                <>
                  <div className={styles.messageContainer}>
                    <i className="fab fa-facebook-messenger text-primary" />
                    <h4>Messenger</h4>
                  </div>
                </>
              ) : (
                <>
                  <RightSide
                    messages={messages}
                    authId={userInfo.id}
                    id={id}
                    t={t}
                  />
                </>
              )}
            </Col>
          </Row>
        </PrivateNavbar>
      )}
    </>
  )
}
export default MessagePages
