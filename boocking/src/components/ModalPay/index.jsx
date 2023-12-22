import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import {Button} from 'reactstrap';
import confirm from 'reactstrap-confirm';
import * as reservationActions from '../../actions/reservation.actions';
import {declOfNum} from '../../utils';
import {toast} from 'react-toastify';

function ModalPay({modalPay, setModalPay, id, sum}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.app.user);

  const payConfirm = async ()=>{
    setModalPay(false);
    const count = Number(sum);
    const result = await confirm({
      title: 'Подтверждение оплаты',
      message: `Оплата брони на ${count} ${declOfNum(count, [
        'рубль',
        'Рублей',
        'Рублей',
      ])}`,
      confirmText: `Подтвердить`,
      confirmColor: 'danger',
      cancelText: `Отменить`,
      cancelColor: 'link text-muted',
    });
    if (userInfo && Number(userInfo.balance) < count) {
      toast.error('на балансе вашего аккаунта недостаточно средств для оплаты');
    } else {
      if (result) {
        dispatch(reservationActions.reservationPay({id: id}));
      }
    }
  };
  return (
    <>
      <Modal show={modalPay} onHide={()=>{
        setModalPay(false);
      }}>
        <Modal.Header closeButton={()=>{
          setModalPay(false);
        }}>
          Оплата Брони
        </Modal.Header>
        <Modal.Body>
          {`Подвердите полату На сумму ${sum} Рублей`}
        </Modal.Body>
        <Modal.Footer>
          <Button color={'primary'} block onClick={payConfirm}>{'Оплатить'}</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default ModalPay;
