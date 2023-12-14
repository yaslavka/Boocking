import React from "react";
import styles from "../../Pages/HotelId/index.module.scss";

function Links() {
    return (
        <>
            <div className={styles.headerInner}>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Номера и цены
                </div>
                <div>
                    |
                </div>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Услуги
                </div>
                <div>
                    |
                </div>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Размещение с детьми
                </div>
                <div>
                    |
                </div>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Способы проезда
                </div>
                <div>
                    |
                </div>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Контакты
                </div>
                <div>
                    |
                </div>
                <div style={{fontSize: 15, fontWeight: 500, marginInline: 20}} role={"button"}>
                    Отзывы
                </div>
            </div>
        </>
    )
}
export default Links