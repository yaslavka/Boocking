import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as payActions from '../../../actions/pay.actions';
import PrivateNavbar from '../../../components/PrivateNavbar';
import styles from './wallet.module.scss';

function Wallet() {
  const dispatch =useDispatch();
  const payHistory = useSelector((state) => state.pay.payHistory);
  useEffect(()=>{
    dispatch(payActions.payHistory());
  }, [dispatch]);
  return (
    <>
      <PrivateNavbar>
        <h1 className={styles.title}>{'История Платежей и баланс'}</h1>
        {payHistory?.length > 0 && (
          <>
            ыаа
          </>
        )}
      </PrivateNavbar>
    </>
  );
}
export default Wallet;
