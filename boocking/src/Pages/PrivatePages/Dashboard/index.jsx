import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import styles from './dashboard.module.scss';
import ProfileInfo from '../../../components/ProfileInfo';
import {Box, LinearProgress, linearProgressClasses} from '@mui/material';
import {styled} from '@mui/material/styles';
import SelectObject from '../../../components/SelectObject';
import PrivateNavbar from '../../../components/PrivateNavbar';

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
  height: 10,
  width: 500,
  borderRadius: 5,
  top: 7,
  marginInline: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
  },
}));

function Dashboard() {
  const userInfo = useSelector((state) => state.app.user);
  const reservation = useSelector((state) => state.reservation.reservation);
  const reservationManager = useSelector((state) => state.reservation.reservationManager);
  const [value, setValue] =useState();
  const [valueSlice] =useState(1);
  const objectManager = userInfo && userInfo.hotel.slice(0, valueSlice);
  const reservationSlice = reservation?.length > 0 && reservation.slice(0, valueSlice);

  return (
    <>
      {userInfo && (
        <PrivateNavbar>
          <ProfileInfo userInfo={userInfo}/>
          <div className={styles.selectObject}>
            <div className={styles.selectObjectText}>
              {userInfo.isManager && (
                <>
                  Мои Отели
                </>
              )}
              {!userInfo.isManager && (
                <>
                  Мои брони
                </>
              )}
            </div>
            <div className={styles.selectObjectWrapper}>
              <select onChange={(e)=>setValue(JSON.parse(e.target.value))}>
                <option disabled defaultValue={'название Отеля'} value='название Отеля'>название Отеля</option>
                {userInfo.isManager ? (
                  <>
                    {userInfo.hotel.map((hotel, index)=>(
                      <option key={index} id={hotel.id} value={JSON.stringify(hotel)}>{hotel.nameHotel}</option>
                    ))}
                  </>
                ):(
                  <>
                    {reservation?.length > 0 && (
                      <>
                        {reservation.map((hotel, index)=>(
                          <option key={index} id={hotel.number.id} value={JSON.stringify(hotel)}>{hotel.number.nameNumber}</option>
                        ))}
                      </>
                    )}
                  </>
                )}
              </select>
            </div>
          </div>
          {userInfo.isManager === true ? (
            <>
              <div className={styles.selectObject}>
                <div className={styles.selectObjectText}>
                  процент наполнения:
                </div>
                <Box sx={{flexGrow: 1}} style={{marginBottom: 10}}>
                  <BorderLinearProgress variant="determinate" value={50} />
                </Box>
              </div>
              {value === undefined ? (
                <>
                  <div className={styles.itemContainer}>
                    <ul className={styles.list}>
                      {objectManager &&(
                        <>
                          {objectManager.map((item, index)=>(
                            <SelectObject index={index} object={item} key={index} reservationManager={reservationManager} objectManager={objectManager} userInfo={userInfo}/>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </>
              ):(
                <>
                  <div className={styles.itemContainer}>
                    <ul className={styles.list}>
                      <SelectObject object={value} reservationManager={reservationManager} userInfo={userInfo}/>
                    </ul>
                  </div>
                </>
              )}
            </>
          ):(
            <>
              {value === undefined ? (
                <>
                  <div className={styles.itemContainer}>
                    <ul className={styles.list}>
                      {reservationSlice?.length > 0 &&(
                        <>
                          {reservationSlice.map((item, index)=>(
                            <SelectObject index={index} object={item} key={index} reservationManager={reservation} userInfo={userInfo} user/>
                          ))}
                        </>
                      )}
                    </ul>
                  </div>
                </>
              ):(
                <>
                  <div className={styles.itemContainer}>
                    <ul className={styles.list}>
                      <SelectObject object={value} reservationManager={reservation} userInfo={userInfo} user/>
                    </ul>
                  </div>
                </>
              )}
            </>
          )}
        </PrivateNavbar>
      )}
    </>
  );
}
export default Dashboard;
