import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as numberActions from '../../../actions/number.actions'
import PrivateNavbar from '../../../components/PrivateNavbar'
import styles from './myHotel.module.scss'
import { Row } from 'reactstrap'
import MyNumbersList from '../../../components/MyNumbersList'

function MyNumbers() {
  const dispatch = useDispatch()
  const numbers = useSelector((state) => state.numberInfo.numberManagerInfo)

  useEffect(() => {
    dispatch(numberActions.numberManagerInfo())
  }, [dispatch])

  return (
    <>
      <PrivateNavbar>
        {numbers?.length > 0 && (
          <div className={styles.hotels}>
            <Row className={styles.row_images}>
              {numbers.map((number, index) => (
                <MyNumbersList key={index} number={number} />
              ))}
            </Row>
          </div>
        )}
      </PrivateNavbar>
    </>
  )
}
export default MyNumbers
