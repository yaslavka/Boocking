import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styles from './allCities.module.scss'
import {Row} from "reactstrap";
import * as pagesActions from '../../actions/app.actions'
import CitiList from "../../components/CitiList";

function AllCities() {
    const dispatch = useDispatch()
    const allCities = useSelector(state => state.geo.allCities)
    const pages = useSelector((state) => state.app.pages)
    const [count]=useState(30)

    let pagesNumber = []
    const lastTaskIndex = pages * count
    const firstTaskIndex = lastTaskIndex - count
    let currentPages = allCities && allCities.slice(firstTaskIndex, lastTaskIndex)
    for (let i = 1; i <= Math.ceil(allCities?.length / count); i++){
        pagesNumber.push(i)
    }
    const nextPages = (page)=>{
        dispatch(pagesActions.pages(page))
    }
    return (
        <>
            <div className={styles.cities}>
                {currentPages && (
                    <>
                        <Row className={styles.row_images}>
                            {currentPages.map((citi, index)=>(
                                <CitiList key={index} cities={citi}/>
                            ))}
                        </Row>
                        <section className={styles.pagesButtonContainer}>
                            {pagesNumber.map((numberPages)=>(
                                <button key={numberPages} onClick={()=>{nextPages(numberPages)}} className={styles.pagesButton}>{numberPages}</button>
                            ))}
                        </section>
                    </>
                )}
            </div>
        </>
    )
}
export default AllCities