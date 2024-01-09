import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import styles from '../../Pages/PrivatePages/MessagePages/messge.module.scss'
import { Col, Row } from 'reactstrap'
import NavBarDashboard from '../NavBarDashboard'
import LiftingModal from '../LiftingModal'
import HighlightModalModal from '../HighlightModal'
import PremiumModal from '../PremiumModal'
import VipModal from '../VipModal'
import PackageModal from '../PackageModal'

function PrivateNavbar({ children }) {
  const { t } = useTranslation('common')
  const userInfo = useSelector((state) => state.app.user)
  const messages = useSelector((state) => state.messages.messages)
  const messagesAdmin = useSelector((state) => state.messages.messagesAdmin)
  const reservation = useSelector((state) => state.reservation.reservation)
  const reservationManager = useSelector(
    (state) => state.reservation.reservationManager,
  )
  const [lifting, setLifting] = useState(false)
  const [highlight, setHighlight] = useState(false)
  const [premium, setPremium] = useState(false)
  const [vip, setVip] = useState(false)
  const [packages, setPackages] = useState(false)
  const liftingPackage =
    userInfo &&
    userInfo?.promotion?.length > 0 &&
    userInfo &&
    userInfo.promotion.filter((i) => i.promotion === 'Поднятие')[0]
  const highlightPackage =
    userInfo &&
    userInfo?.promotion?.length > 0 &&
    userInfo &&
    userInfo.promotion.filter((i) => i.promotion === 'Выделение')[0]
  const premiumPackage =
    userInfo &&
    userInfo?.promotion?.length > 0 &&
    userInfo &&
    userInfo.promotion.filter((i) => i.promotion === 'Премиум')[0]
  const vipPackage =
    userInfo &&
    userInfo?.promotion?.length > 0 &&
    userInfo &&
    userInfo.promotion.filter((i) => i.promotion === 'VIP БЛОК')[0]
  return (
    <>
      {userInfo && (
        <>
          <div className={styles.main}>
            <Row>
              <Col xl={3} className={styles.navContainer}>
                <NavBarDashboard
                  reservation={reservation}
                  userInfo={userInfo}
                  messages={messages}
                  messagesAdmin={messagesAdmin}
                  reservationManager={reservationManager}
                  t={t}
                  setLifting={setLifting}
                  setHighlight={setHighlight}
                  setPremium={setPremium}
                  setVip={setVip}
                  setPackage={setPackages}
                />
              </Col>
              <Col
                xl={9}
                className={styles.colM}
                style={{ width: '70%', margin: '15px auto' }}
              >
                {children}
              </Col>
            </Row>
          </div>
          {lifting && (
            <LiftingModal
              lifting={lifting}
              liftingPackage={liftingPackage}
              setLifting={setLifting}
              objectManager={userInfo.hotel}
            />
          )}
          {highlight && (
            <HighlightModalModal
              objectManager={userInfo.hotel}
              highlight={highlight}
              highlightPackage={highlightPackage}
              setHighlight={setHighlight}
            />
          )}
          {premium && (
            <PremiumModal
              objectManager={userInfo.hotel}
              premium={premium}
              premiumPackage={premiumPackage}
              setPremium={setPremium}
            />
          )}
          {vip && (
            <VipModal
              setVip={setVip}
              objectManager={userInfo.hotel}
              vip={vip}
              vipPackage={vipPackage}
            />
          )}
          {packages && (
            <PackageModal
              packages={packages}
              setPackages={setPackages}
              objectManager={userInfo.hotel}
              vipPackage={vipPackage}
              premiumPackage={premiumPackage}
              highlightPackage={highlightPackage}
              liftingPackage={liftingPackage}
            />
          )}
        </>
      )}
    </>
  )
}
export default PrivateNavbar
