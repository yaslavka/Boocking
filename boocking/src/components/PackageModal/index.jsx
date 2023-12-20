import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import confirm from 'reactstrap-confirm';
import Modal from 'react-bootstrap/Modal';
import {Form} from 'react-bootstrap';
import {declOfNum} from '../../utils';
import {Button, FormGroup, Input} from 'reactstrap';

function PackageModal({packages, setPackages, liftingPackage, highlightPackage, premiumPackage, vipPackage, objectManager}) {
  const {t} = useTranslation('common');
  const [input, setInput] = useState(null);
  const [id, setId] = useState(null);
  const handleChange =(e)=>{
    setInput(Number(e.target.value));
  };
  const packagesConfirmValue = async ()=>{
    setPackages(false);
    const days = Number(input);
    const result = await confirm({
      title: `${t('Подтвердите Поднятие')}`,
      message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
        `${t('день')}`,
        `${t('дня')}`,
        `${t('дней')}`,
      ])}, ${t('на сумму')} ${days * Number(vipPackage.price) + days * Number(liftingPackage.price) + days * Number(highlightPackage.price) + days * Number(premiumPackage.price)}  RUB?`,
      confirmText: `${t('Подтвердить')}`,
      confirmColor: 'danger',
      cancelText: `${t('Отменить')}`,
      cancelColor: 'link text-muted',
    });
    if (result) {

    }
  };

  return (
    <>
      <Modal show={packages} onHide={()=> {
        setPackages(false);
      }}>
        <Modal.Header closeButton={()=> {
          setPackages(false);
        }}>
                    Пакетное Размещение
        </Modal.Header>
        <Form onSubmit={(e)=>e.preventDefault()}>
          <>
            {objectManager && (
              <FormGroup style={{paddingInline: 25, paddingTop: 10}}>
                <select onChange={(e)=>setId(e.target.value)}>
                  <option value="Выберите отель" disabled >Выберите отель</option>
                  {objectManager.map((item) => (
                    <>
                      <option id={item.id} value={item.id}>{item.nameHotel}</option>
                    </>
                  ))}
                </select>
              </FormGroup>
            )}
            <FormGroup style={{paddingInline: 25, paddingTop: 10}}>
              <Input type="number" name="vip"
                value={input}
                placeholder="Количество дней" onChange={handleChange}/>
            </FormGroup>
          </>
          <Modal.Footer>
            <Button color={'primary'} type={'button'} onClick={packagesConfirmValue}>Выделить</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
export default PackageModal;
