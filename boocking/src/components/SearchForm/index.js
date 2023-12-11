import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import styles from './search.module.scss'
import {Form} from "reactstrap";
import DatePicker from "react-datepicker";
import './index.css'
import {Button} from "react-bootstrap";

function SearchForm({t}) {
    let match = useHistory()
    const [people, setPeople] = useState({label: '', value: 0})
    const [child, setChild] = useState({label: '', value: 0})
    const [search, setSearch] = useState({search: ''})
    const [startDateVisible, setStartDateVisible] = useState(false);
    const [startDate, setStartDate] = useState('')
    const [endDates, setEndDates] = useState('')
    const handleOnchange = (event) => {
        setSearch({search: event.target.value});
    };
    const submitSignInForm =()=>{
        match.push("/search_hotel_home",{ search, endDates, startDate, people, child })
    }
    return (
        <>
            <div className={styles.search}>
                <div className={styles.inner}>
                    <Form className={styles.form}>
                        <svg  width="22" viewBox="0 0 22 23" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M3 9H5V16H3V9ZM9 9H11V16H9V9ZM20 5L10 0L0 5V7H20V5ZM4.47 5L10 2.24L15.53 5H4.47ZM0 18V20H12.4C12.19 19.36 12.08 18.69 12.04 18H0ZM17 11.26V9H15V12.26L17 11.26ZM18 13L14 15V17.55C14 20.07 15.71 22.43 18 23C20.29 22.43 22 20.07 22 17.55V15L18 13ZM17.28 20L15.25 17.97L16.31 16.91L17.28 17.88L19.69 15.5L20.75 16.56L17.28 20Z"
                                fill="#0094FF"/>
                        </svg>
                        <div className='search-form-input'>
                            <input className={styles.input} name="search" value={search.search} placeholder={t('searchForm.location')} onChange={handleOnchange}/>
                        </div>
                        <div>
                            |
                        </div>
                        <svg fill="#0094FF"
                             width="26"
                             focusable="false" viewBox="0 0 24 24"
                             data-testid="CalendarMonthOutlinedIcon">
                            <path
                                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                        </svg>
                        <DatePicker
                            selected={startDate}
                            placeholderText={t('searchForm.dateIn')}
                            onChange={(date) => setStartDate(date)}
                        />
                        <div>
                            |
                        </div>
                        <svg fill="#0094FF"
                             width="26"
                             focusable="false" viewBox="0 0 24 24"
                             data-testid="CalendarMonthOutlinedIcon">
                            <path
                                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z"/>
                        </svg>
                        <DatePicker
                            selected={endDates}
                            placeholderText={t('searchForm.dateOut')}
                            onChange={(date) => setEndDates(date)}
                        />
                        <div>
                            |
                        </div>
                        <div className={styles.main_search}>
                            <div className={startDateVisible? "dropdown dropdown--show":"dropdown"}>
                                <div className="dropdown__toggle">
                                    <svg fill={startDateVisible? "#0094FF":"#0094FF"}
                                         className="main-search__icon main-search__icon-guests" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg"
                                         focusable="false">
                                        <path d="M6940.875,2932.947a14.76,14.76,0,0,1-7.875-1.871,7.677,7.677,0,0,1,4.025-6.608,5.473,5.473,0,0,0,3.85,1.532,5.617,5.617,0,0,0,3.851-1.532,7.406,7.406,0,0,1,4.024,6.608,13.108,13.108,0,0,1-6.733,1.924C6941.647,2933,6941.266,2932.983,6940.875,2932.947Zm-4.376-13.124v-.088a4.39,4.39,0,1,1,8.752,0v.088a4.389,4.389,0,1,1-8.752,0Z" transform="translate(-6933 -2915)"/>
                                    </svg>
                                    <div className="main-search__guests-input main-search__input">{people.label + child.label|| 'Кол-тво людей'}</div>
                                    <div className="main-search__open-guests" role={"button"} onClick={()=>setStartDateVisible(!startDateVisible)}>
                                        <svg className="main-search__icon main-search__caret-down" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg"
                                             focusable="false">
                                            <path d="M7.2,11l4.4,3.8a.561.561,0,0,0,.9,0L16.9,11a.6.6,0,0,0-.4-1h-9A.575.575,0,0,0,7.2,11Z" transform="translate(-7.011 -10)"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="dropdown__menu guests-popup">
                                    <div className="guests-popup__adults">
                                        <div className="guests-popup__label bold">Взрослых:</div>
                                        <div className="toggle-buttons">
                                            <input id="guests-popup__adult-1" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-1"
                                                   className="toggle-buttons__label" onClick={()=>setPeople({ value: 1, label: '1 взр.' })}>1</label>
                                            <input id="guests-popup__adult-2" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-2"
                                                   className="toggle-buttons__label" onClick={()=>setPeople({ value: 2, label: '2 взр.'})}>2</label>
                                            <input id="guests-popup__adult-3" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-3"
                                                   className="toggle-buttons__label" onClick={()=>setPeople({ value: 3, label: '3 взр.'})}>3</label>
                                            <input id="guests-popup__adult-4" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-4"
                                                   className="toggle-buttons__label" onClick={()=>{setPeople({ value: 4, label: '4 взр.'})}}>4</label>
                                            <input id="guests-popup__adult-5" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-5"
                                                   className="toggle-buttons__label" onClick={()=>{setPeople({ value: 5, label: '5 взр.'})}}>5</label>
                                            <input id="guests-popup__adult-6" className="toggle-buttons__button"
                                                   type="radio" name="adults" value={people.value}/>
                                            <label htmlFor="guests-popup__adult-6"
                                                   className="toggle-buttons__label" onClick={()=>{setPeople({ value: 6, label: '6 взр.'})}}>6</label>
                                        </div>
                                    </div>
                                    <div className="guests-popup__children">
                                        <div className="guests-popup__label bold">Детей:</div>
                                        <div className="toggle-buttons">
                                            <input id="guests-popup__child-0" className="toggle-buttons__button"
                                                   type="radio" name="children" value={child.value}/>
                                            <label htmlFor="guests-popup__child-0"
                                                   className="toggle-buttons__label" onClick={()=>setChild({ value: 0, label: '' })}>0</label>
                                            <input id="guests-popup__child-1" className="toggle-buttons__button"
                                                   type="radio" name="children" value={child.value}/>
                                            <label htmlFor="guests-popup__child-1"
                                                   className="toggle-buttons__label" onClick={()=>setChild({ value: 1, label: 'и 1 реб.'})}>1</label>
                                            <input id="guests-popup__child-2" className="toggle-buttons__button"
                                                   type="radio" name="children" value={child.value}/>
                                            <label htmlFor="guests-popup__child-2"
                                                   className="toggle-buttons__label" onClick={()=>setChild({ value: 2, label: 'и 2 дет.'})}>2</label>
                                            <input id="guests-popup__child-3" className="toggle-buttons__button"
                                                   type="radio" name="children" value={child.value}/>
                                            <label htmlFor="guests-popup__child-3"
                                                   className="toggle-buttons__label" onClick={()=>{setChild({ value: 3, label: 'и 3 дет.'})}}>3</label>
                                        </div>
                                    </div>
                                    <div className="guests-popup__footer">
                                        <div className=" button-ss">
                                            <div className=" text-left">
                                                <Button type="button"
                                                        className="guests-popup__close guests-popup__button button" onClick={()=>{setPeople({ value: 0, label: ''});setChild({ value: 0, label: ''}); setStartDateVisible(false)}}>Отмена
                                                </Button>
                                            </div>
                                            <div className=" text-right">
                                                <Button type="button" onClick={()=>setStartDateVisible(false)}
                                                        className="guests-popup__apply guests-popup__button button button-primary">Применить
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button type="button" color={'primary'} onClick={submitSignInForm}>
                            найти
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}
export default SearchForm