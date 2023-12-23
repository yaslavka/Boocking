import React from 'react';
import {useSelector} from 'react-redux';
import PrivateNavbar from '../../../components/PrivateNavbar';
import styles from './myHotel.module.scss';
import {Row} from 'reactstrap';
import MyHotelsList from '../../../components/MyHotelsList';

function MyaHotels() {
  const objects = useSelector((state) => state.myObject.object);
  return (
    <>
      <PrivateNavbar>
        {objects?.length > 0 && (
          <div className={styles.hotels}>
            <Row className={styles.row_images}>
              {objects.map((hotel, index)=>(
                <MyHotelsList key={index} hotel={hotel}/>
              ))}
            </Row>
          </div>
        )}
      </PrivateNavbar>
    </>
  );
}
export default MyaHotels;
