import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import confirm from 'reactstrap-confirm'
import * as hotelIdActions from '../../actions/hotelId.actions'
import styles from './index.module.scss'
import HotelIdNav from "../../components/HotelIdNav";
import {Col, Row} from "reactstrap";
import NavBarHotelId from "../../components/NavabarHotelId";
import HeaderHotel from "../../components/HeaderHotel";
import Links from "../../components/Links/Links";
import PhotoAlbums from "../../components/PhotoAlbums";
import DescriptionHotel from "../../components/DescriptionHotel";
import Offers from "../../components/Offers";
import {Button} from "reactstrap";
import {declOfNum} from "../../utils";
import Number from "../../components/Number";


function HotelId() {
    const dispatch = useDispatch()
    const {id}= useParams()
    const {t} = useTranslation('common')
    const hotelId = useSelector((state) => state.hotelId.hotelId)
    const [morItem, setMorItem] = useState(3)
    const [endDates, setEndDates] = useState('')
    const [startDate, setStartDate] = useState('')
    useEffect(()=>{
        dispatch(hotelIdActions.hotelId(id))
    },[dispatch, id])
    const slice = hotelId && hotelId.number.slice(0, morItem)

    const LoadMor=()=>{
        setMorItem(morItem + hotelId?.number.length)
    }
    const broneceng = async (komnat, price, index, startDate, endDates)=>{
        const planetLength = +komnat
        let result = await confirm({
            title:`${t('Подтвердите бронь')}`,
            message: `${t('Бронирование номера сколичеством')} ${planetLength} ${declOfNum(planetLength, [
                `${t('комната')}`,
                `${t('комнат')}`,
                `${t('комнату')}`,
            ])}, ${t('на сумму')} ${planetLength * +price} RUB?`,
            confirmText: `${t('Подтвердить')}`,
            confirmColor: 'danger',
            cancelText: `${t('Отменить')}`,
            cancelColor: 'link text-muted',
        })

        if (result) {

        }
    }
    return (
        <>
            <div className={styles.root}>
                {hotelId && (
                    <HotelIdNav hotelId={hotelId} t={t}/>
                )}
                <div className={styles.main}>
                    <Row>
                        <Col xl={3} className={styles.colNav}>
                            <NavBarHotelId/>
                        </Col>
                        {hotelId && (
                            <Col xl={9} >
                                <HeaderHotel hotelId={hotelId}/>
                                <Links/>
                                <section className={styles.section}>
                                    <PhotoAlbums hotelId={hotelId}/>
                                </section>
                                <section className={styles.section}>
                                    <Row>
                                        <Col xl={9}>
                                            <DescriptionHotel hotelId={hotelId}/>
                                        </Col>
                                        <Col xl={3}>
                                            <Offers hotelId={hotelId}/>
                                        </Col>
                                    </Row>
                                </section>
                                <section className={styles.section}>
                                    <div style={{fontWeight: 800, fontSize: 30, color: '#6926ac'}}>
                                        Все номера отеля
                                    </div>
                                </section>
                                <section className={styles.section}>
                                    {slice && (
                                        <Row>
                                            {slice.map((number)=>{
                                                return (
                                                    <>
                                                        <Number key={number.id} number={number} broneceng={broneceng} hotelId={hotelId} startDate={startDate} endDates={endDates}/>

                                                    </>
                                                )
                                            })}
                                            <Button color={'primary'} type={"button"} onClick={LoadMor}>
                                                Показать все номера ({hotelId?.number.length} шт.) <span className="fa fa-arrow-down"/>
                                            </Button>
                                        </Row>
                                    )}
                                </section>
                            </Col>
                        )}
                    </Row>
                </div>
            </div>
        </>
    )
}
export default HotelId