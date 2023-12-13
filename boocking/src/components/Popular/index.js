import React from "react";
import styles from './poular.module.scss'

function Popular({Populars, i}) {
    return (
        <>
            <div className={styles.checkbox}>
                <input id={i.id} value={i.checked} checked={i.checked} type='checkbox' onChange={()=>Populars(i.id)} className={styles.input}/>
                <label htmlFor={i.id} className={`${styles.label} ${i.checked === true? 'selected': ''}`}>
                    {i.label}
                </label>

            </div>
        </>
    )
}
export default Popular