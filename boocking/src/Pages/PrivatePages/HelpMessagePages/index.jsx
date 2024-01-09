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

function HelpMessagePages() {
  const dispatch = useDispatch()
  const { id } = useParams()
  const { t } = useTranslation('common')
  const userInfo = useSelector((state) => state.app.user)
  const messages = useSelector((state) => state.messages.messagesAdmin)

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      dispatch(messageActions.messageAdminInfo(1))
    } else {
      dispatch(messageActions.messageAdminInfo(userInfo?.id))
    }
  }, [dispatch, userInfo?.id, userInfo?.isAdmin])
  return (
    <>
      {userInfo && (
        <PrivateNavbar>
          <Row className={styles.message}>
            {userInfo.isAdmin && (
              <Col
                xl={3}
                className={`${styles.borderRight}`}
                style={{ padding: 0 }}
              >
                <LeftSide messages={messages} authId={userInfo.id} help />
              </Col>
            )}
            <Col
              xl={8}
              className={styles.borderRightC}
              style={{
                padding: 0,
                width: userInfo.isAdmin === false ? '100%' : '75%',
              }}
            >
              {userInfo.isAdmin && id === undefined ? (
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
                    userInfo={userInfo}
                    help
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
export default HelpMessagePages
