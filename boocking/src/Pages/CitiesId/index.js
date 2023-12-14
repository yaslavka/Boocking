import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import * as citiesActions from '../../actions/geo.actions'
import Recommended from "../../components/Recommended";
import SearchForm from "../../components/SearchForm";
import {useTranslation} from "react-i18next";
import styles from './index.module.scss'
import routesLik from "../../constants/routes.constants";
import {Col, Row} from "react-bootstrap";
import NavBarFilters from "../../components/NavBarFilters";
import {populars} from "../../components/Popular/data";
import ListHotel from "../../components/ListHotel/ListHotel";

const linkMap = [
    {
        id: 0,
        title: 'Популярность'
    },
    {
        id: 1,
        title: 'Оценка по отзывам'
    },
    {
        id: 2,
        title: 'Звезды'
    },
    {
        id: 3,
        title: 'Расположение'
    },
    {
        id: 4,
        title: 'Цена'
    },
]
const viewBox = [
    {
        id: 0,
        title: 'Плитка',
        className: 'fa fa-th'
    },
    {
        id: 1,
        title: 'Список',
        className: 'fa fa-th-list'
    },
    {
        id: 2,
        title: 'На карте',
        className: 'fa fa-map-marker'
    },
]

function CitiesId() {
    const [type, setType]= useState(0)
    const [title, setTitle]= useState(1)
    const dispatch = useDispatch()
    const {id}= useParams()
    const {t} = useTranslation('common')
    const cities = useSelector((state) => state.geo.cities)
    const recommended = useSelector((state)=>state.recommended.recommended)
    const citiesId = useSelector(state => state.geo.citiesId)
    const hotels = citiesId && citiesId.hotel
    const [hotelFtFiltered, setHotelFiltered]=useState( [])
    const [isWifi, seIsWif]=useState(null)
    const [popular, setPopular]=useState([])

    useEffect(()=>{
        dispatch(citiesActions.citiesIdInfo(id))
        setPopular(populars)
        setHotelFiltered(citiesId && citiesId.hotel)
    },[dispatch, id])

    const Populars = (i)=>{
        let stateList = popular && popular
        const changeCheckedCuisines = stateList.map((item) =>
            (item.id === i ? { ...item, checked: !item.checked } : item)
        );
        setPopular(changeCheckedCuisines);
    }

    const Filters = () => {
        if (!popular || !hotels) {
            return;
        }

        const activeWifiFilters = popular.filter(item => item.checked && item.wifi).map(item => item.wifi);
        const activeTypeFilters = popular.filter(item => item.checked && item.label).map(item => item.label.toLowerCase());

        let updateList;

        if (activeWifiFilters.length > 0 || activeTypeFilters.length > 0) {
            updateList = hotels.filter(item => {
                const wifiMatch = activeWifiFilters.length === 0
                    || activeWifiFilters.includes(item.wifi)
                    || activeTypeFilters.includes(item.typeHotel.toLowerCase());
                const typeMatch = activeTypeFilters.length === 0
                    || activeTypeFilters.includes(item.typeHotel.toLowerCase())
                    || activeWifiFilters.includes(item.wifi);
                return wifiMatch && typeMatch;
            });
        } else {
            updateList = hotels;
        }

        setHotelFiltered(updateList);
    };
    useEffect(()=>{
        Filters()
    },[popular])
    return(
        <>
            <div style={{ marginBottom: 20}}/>
            <div className={styles.root}>
                <div className={styles.searchContainer}>
                    <SearchForm t={t} cities={cities} pathId={id}/>
                </div>
                {recommended && <Recommended recommended={recommended} t={t}/>}
                {citiesId && (
                    <>
                        <div className={styles.pagesTitle}>
                            <Link className={styles.pagesLinks} to={routesLik.root}>
                                Главная
                            </Link>
                            <div className={styles.pagesArrow}> > </div>
                            <Link className={styles.pagesLinks} to={routesLik.root}>
                                {citiesId.geo_region.geo_region}
                            </Link>
                            <div className={styles.pagesArrow}> > </div>
                            <Link className={styles.pagesLinks} to={`/search_hotel_home/${citiesId.id}`}>
                                {citiesId.geo_city}
                            </Link>
                        </div>
                        <div className={styles.pagesSubTitle}>
                            Отели {citiesId.geo_region.geo_region}
                        </div>
                    </>
                )}
                <Row>
                    <Col xl={3}>
                        <NavBarFilters
                            isWifi={isWifi}
                            seIsWif={seIsWif}
                            popular={popular} Populars={Populars}
                        />
                    </Col>
                    <Col xl={9}>
                        <div className={styles.listLayout}>
                            <div className={styles.toolBox}>
                                <div className={styles.sortBox}>
                                    <ul className={styles.ulBox}>
                                        <li className={styles.label}>Сортировать:</li>
                                        {linkMap.map((item, index)=>(
                                            <button key={index} type="button"
                                                    className={type === index ? styles.active: styles.link}
                                                    onClick={() => setType(index)}>
                                                {item.title}
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                                <div className={styles.sortBox}>
                                    <ul className={styles.ulBox}>
                                        {viewBox.map((item, index)=>(
                                            <>
                                                <button key={index}  type="button"
                                                        className={title === index ? styles.active: styles.link}
                                                        onClick={() => setTitle(index)}>
                                                    <span className={item.className}>
                                                    </span>
                                                    {item.title}
                                                </button>
                                            </>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            {hotelFtFiltered?.length > 0 && (
                                <div className={styles.itemContainer}>
                                    <ul className={styles.list} style={{display: title === 0 ? 'flex' : "block"}}>
                                        {hotelFtFiltered.map((item, index)=>(
                                            <ListHotel key={item.id} hotel={item} index={index}/>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}
export default CitiesId