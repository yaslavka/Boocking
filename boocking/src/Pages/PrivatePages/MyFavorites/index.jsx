import React, {useEffect} from 'react';
import styles from './favorites.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import ListHotel from '../../../components/ListHotel/ListHotel';
import PrivateNavbar from '../../../components/PrivateNavbar';
import * as actionFavorite from '../../../actions/favorites.actions';

function MyFavorites() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.user);
  const favorites = useSelector((state) => state.favorites.favorites);
  useEffect(()=>{
    dispatch(actionFavorite.favorites());
  }, [dispatch]);
  return (
    <>
      {userInfo && (
        <PrivateNavbar>
          {userInfo.isAdmin === false && userInfo.isManager === false ? (
            <>
              <h1 className={styles.title}>Избранные отели</h1>
              {favorites.length > 0 && (
                <section className={`${styles.fullRow}`}>
                  <div className={styles.container}>
                    {favorites.map((item, index)=>(
                      <>
                        {item.status === true && (
                          <ListHotel hotel={item.hotel} index={index} key={index}/>
                        )}
                      </>
                    ))}
                  </div>
                </section>
              )}
            </>
          ):(
            <>

            </>
          )}
        </PrivateNavbar>
      )}
    </>
  );
}
export default MyFavorites;
