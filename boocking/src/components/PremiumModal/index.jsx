import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import confirm from 'reactstrap-confirm'
import Modal from 'react-bootstrap/Modal';
import {Form} from "react-bootstrap";
import {declOfNum} from "../../utils";
import {Button, FormGroup, Input} from "reactstrap";

function PremiumModal({premium, premiumPackage, object, setPremium, objectManager, value}) {
    const { t } = useTranslation('common');
    const [premiumInput, setPremiumInput] = useState(null)
    const [id, setId] = useState(null)
    const handleChange =(e)=>{
        setPremiumInput(Number(e.target.value))
    }
    const highlightConfirmValue = async ()=>{
        setPremium(false)
        const days = Number(premiumInput)
        let result = await confirm({
            title:`${t('Подтвердите Поднятие')}`,
            message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
                `${t('день')}`,
                `${t('дня')}`,
                `${t('дней')}`,
            ])}, ${t('на сумму')} ${days * Number(premiumPackage.price)} RUB?`,
            confirmText: `${t('Подтвердить')}`,
            confirmColor: 'danger',
            cancelText: `${t('Отменить')}`,
            cancelColor: 'link text-muted',
        })
        if (result){

        }

    }
    const highlightConfirm = async ()=>{
        setPremium(false)
        const days = Number(premiumInput)
        let result = await confirm({
            title:`${t('Подтвердите Поднятие')}`,
            message: `${t('Поднятие в списке на')} ${days} ${declOfNum(days, [
                `${t('день')}`,
                `${t('дня')}`,
                `${t('дней')}`,
            ])}, ${t('на сумму')} ${days * Number(premiumPackage.price)} RUB?`,
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
            <Modal show={premium} onHide={()=> {setPremium(false)}}>
                <Modal.Header closeButton={()=> {setPremium(false)}}>
                    Выделение
                </Modal.Header>
                <Form onSubmit={(e)=>e.preventDefault()}>
                    {value ? (
                        <>
                            <FormGroup style={{paddingInline: 25, paddingTop: 10}}>
                                <Input type="number" name="premium"
                                       value={premiumInput}
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
                               <Input type="number" name="premium"
                                      value={premiumInput}
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
export default PremiumModal