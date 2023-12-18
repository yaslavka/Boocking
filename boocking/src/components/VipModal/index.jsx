import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import confirm from 'reactstrap-confirm'
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {declOfNum} from "../../utils";
import {Button, FormGroup, Input} from "reactstrap";

function VipModal({vip, vipPackage, object, setVip, objectManager, value}) {
    const { t } = useTranslation('common');
    const [vipInput, setVipInput] = useState(null)
    const [id, setId] = useState(null)
    const handleChange =(e)=>{
        setVipInput(Number(e.target.value))
    }
    const highlightConfirmValue = async ()=>{
        setVip(false)
        const days = Number(vipInput)
        let result = await confirm({
            title:`${t('Подтвердите Поднятие')}`,
            message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
                `${t('день')}`,
                `${t('дня')}`,
                `${t('дней')}`,
            ])}, ${t('на сумму')} ${days * Number(vipPackage.price)} RUB?`,
            confirmText: `${t('Подтвердить')}`,
            confirmColor: 'danger',
            cancelText: `${t('Отменить')}`,
            cancelColor: 'link text-muted',
        })
        if (result){

        }

    }
    const highlightConfirm = async ()=>{
        setVip(false)
        const days = Number(vipInput)
        let result = await confirm({
            title:`${t('Подтвердите Поднятие')}`,
            message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
                `${t('день')}`,
                `${t('дня')}`,
                `${t('дней')}`,
            ])}, ${t('на сумму')} ${days * Number(vipPackage.price)} RUB?`,
            confirmText: `${t('Подтвердить')}`,
            confirmColor: 'danger',
            cancelText: `${t('Отменить')}`,
            cancelColor: 'link text-muted',
        })
        if (result){

        }

    }
    return (
        <>
            <Modal show={vip} onHide={()=> {setVip(false)}}>
                <Modal.Header closeButton={()=> {setVip(false)}}>
                    Выделение
                </Modal.Header>
                <Form onSubmit={(e)=>e.preventDefault()}>
                    {value ? (
                        <>
                            <FormGroup style={{paddingInline: 25, paddingTop: 10}}>
                                <Input type="number" name="highlight"
                                       value={vipInput}
                                       placeholder="Количество дней" onChange={handleChange}/>
                            </FormGroup>
                        </>
                    ):(
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
                                      value={vipInput}
                                      placeholder="Количество дней" onChange={handleChange}/>
                           </FormGroup>
                       </>
                    )}
                    <Modal.Footer>
                        <Button color={'primary'} type={"button"} onClick={value ? highlightConfirmValue : highlightConfirm}>Выделить</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
export default VipModal