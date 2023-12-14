import React, {useState} from "react";
import styles from "../../Pages/HotelId/index.module.scss";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import {Button} from "reactstrap";

function SearchFormHotelId() {
    const cities = useSelector((state) => state.geo.allCities)
    const [people, setPeople] = useState({label: '', value: 0})
    const [child, setChild] = useState({label: '', value: 0})
    const [search, setSearch] = useState({search: ''})
    const [id, setId]=useState('')
    const [startDateVisible, setStartDateVisible] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDates, setEndDates] = useState('')
    const [inputAction, setInputAction] = useState(false);
    let match = useHistory()
    const path = match.location.pathname
    const submitSignInForm =()=>{
        match.push(`/search_hotel_home/${id}`,{ endDates, startDate, people, child })
    }
    const filterCiti = cities ?
        cities.filter((citi)=>citi.geo_city.toLowerCase().includes(search.search.toLowerCase())):[]
    return (
        <>
            <div className={styles.sidebarSearchForms}>
                <div className={styles.sidebarSearchFormsTitle}>
                    <h4 className={styles.formsTitles}>Забронировать номер</h4>
                </div>
                <div className={styles.titlesButton}/>
                <div className={styles.form}>
                    <div className={styles.inputContainer}>
                        <svg width="22" viewBox="0 0 22 23" fill="none" className="location-icon icon icon_search"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9H5V16H3V9ZM9 9H11V16H9V9ZM20 5L10 0L0 5V7H20V5ZM4.47 5L10 2.24L15.53 5H4.47ZM0 18V20H12.4C12.19 19.36 12.08 18.69 12.04 18H0ZM17 11.26V9H15V12.26L17 11.26ZM18 13L14 15V17.55C14 20.07 15.71 22.43 18 23C20.29 22.43 22 20.07 22 17.55V15L18 13ZM17.28 20L15.25 17.97L16.31 16.91L17.28 17.88L19.69 15.5L20.75 16.56L17.28 20Z" fill="#0094FF"/>
                        </svg>
                        <input className={styles.input} placeholder={'Локация / гостиница'}/>
                    </div>
                    <div className={styles.inputContainer}>
                        <svg fill="#0094FF"
                             width="26"
                             focusable="false" viewBox="0 0 24 24"
                             data-testid="CalendarMonthOutlinedIcon">
                            <path
                                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                        </svg>
                        <DatePicker
                            selected={endDates}
                            placeholderText="Дата Выезда"
                            onChange={(date) => setEndDates(date)}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <svg fill="#0094FF"
                             width="26"
                             focusable="false" viewBox="0 0 24 24"
                             data-testid="CalendarMonthOutlinedIcon">
                            <path
                                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                        </svg>
                        <DatePicker
                            selected={startDate}
                            placeholderText="Дата Заезда"
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <Button color="primary" type="submit" onClick={submitSignInForm}>
                        <span>Найти</span>
                    </Button>
                </div>
            </div>
        </>
    )
}
export default SearchFormHotelId