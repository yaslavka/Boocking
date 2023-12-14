import React from "react";
import styles from "../../Pages/HotelId/index.module.scss";

function Offers() {
    return (
        <>
            <div className={styles.ofer}>
                <h1 style={{fontWeight: 700, fontSize: 17, color: '#6EA4D3', padding: 10}}>ОТЕЛЬ ПРЕДЛОГАЕТ ГОСТЯМ:</h1>
                <div style={{borderTopWidth: 1, borderTopColor: '#0d6efd'}}>

                </div>
                <span className="fa fa-map-marker" style={{padding: 10}}>
                        {' '} Размещение в самом центре
                </span>
                <span className="fa fa-umbrella" style={{padding: 10}}>
                        {' '} Есть собственный пляж
                </span>
                <span className="fa" style={{padding: 10}}>
                        <svg
                            width={25} height={45}
                            focusable="false" aria-hidden="true" data-testid="LocalParkingIcon"
                            tabIndex="-1" >
                            <path d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"/>
                        </svg>{' '} бесплатная Парковка
                </span>
                <span className="fa fa-car" style={{padding: 10}}>
                    {' '} Доступен трансфер
                    <div>{' '} (за дополнительную оплату)</div>
                </span>
                <span className="fa fa-wifi" style={{padding: 10}}>
                        {' '} Бесплатный WI-FI
                </span>
                <span className="fa fa-key" style={{padding: 10}}>
                        {' '} Бронирование на прямую с моментальным подтверждением
                </span>
                <div style={{marginBottom: 30}}/>
            </div>
        </>
    )
}
export default Offers