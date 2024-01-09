import React from 'react'
import { Button, Col, Row } from 'reactstrap'
import styles from './reviewComponent.module.scss'

function ReviewComponent({ hotelId, loadMorReview, review }) {
  return (
    <>
      <Row className={styles.reviewContainer}>
        <Col xl={3} className={styles.reviewCol}>
          <div className={styles.reviewBal}>{hotelId.bal}</div>
          {hotelId.bal > 6 ? (
            <div className={styles.reviewBalText}>очень хорошо</div>
          ) : (
            <div className={styles.reviewBalText}>Так себе</div>
          )}
        </Col>
        <Col className={styles.reviewColRating}>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
      {review && (
        <>
          {review.map((item, index) => (
            <Row key={index} className={styles.reviewContainer}>
              <Col xl={3} className={styles.reviewCol}>
                <div className={styles.reviewBal}>
                  <article className={styles.reviewAvatar}>
                    <img
                      src={
                        item.user.avatar
                          ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${item.user.avatar}`
                          : 'https://www.w3schools.com/howto/img_avatar.png'
                      }
                      alt={hotelId.nameHotel}
                    />
                    <div className={styles.reviewFirstName}>
                      {item.user.first_name}
                    </div>
                  </article>
                </div>
                <div className={styles.reviewBalGeoCity}>
                  {item.user.geo_city.geo_city}
                </div>
                <div className={styles.reviewBalGeoCity}>{item.grade}</div>
              </Col>
              <Col className={styles.reviewColRating}>
                <div className={styles.reviewComments}>
                  <svg width={30} height={30} fill="#06f322">
                    <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
                  </svg>
                  <div style={{ fontSize: 20, fontWeight: 500 }}>
                    Достоинства:
                  </div>
                </div>
                <div>{item.dignity}</div>
                <div className={styles.reviewComments}>
                  <svg width={30} height={30} fill="#06f322">
                    <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.52-.86-.88-1.22L14 2 7.59 8.41C7.21 8.79 7 9.3 7 9.83v7.84C7 18.95 8.05 20 9.34 20h8.11c.7 0 1.36-.37 1.72-.97l2.66-6.15z" />
                  </svg>
                  <div style={{ fontSize: 20, fontWeight: 500 }}>Минусы:</div>
                </div>
                <div>{item.minus}</div>
                <div className={styles.reviewComments}>
                  <div className={styles.reviewCommentsComfort}>
                    {item.comfort}
                  </div>
                  <div className={styles.reviewCommentsPersonal}>
                    {item.personal}
                  </div>
                </div>
              </Col>
            </Row>
          ))}
        </>
      )}
      <Button
        className={styles.reviewButtonMor}
        onClick={() => loadMorReview()}
      >
        <span>
          Показать все Отзывы ({hotelId.review.length} шт.){' '}
          <span className="fa fa-arrow-down"></span>
        </span>
      </Button>
    </>
  )
}
export default ReviewComponent
