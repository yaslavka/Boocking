import React, {useState} from "react";
import {Col} from "reactstrap";
import BroneButton from "../BroneButton";

function Number({number, broneceng, endDates, hotelId, startDate}) {
    const [active, setActive] =useState(false)
    return(
        <>
            <Col xl={9}>
              <div onClick={()=>setActive(true)}>
                  gsdgsd
              </div>
            </Col>
            <Col xl={3}>
                {active && (
                    <BroneButton number={number} key={number.id} broneceng={broneceng} startDate={startDate} endDates={endDates}/>
                )}
            </Col>
        </>
    )
}
export default Number