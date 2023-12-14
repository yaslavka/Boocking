import React from "react";

function DescriptionHotel({hotelId}) {
    return (
        <>
            <div style={{fontWeight: 800, fontSize: 30, color: '#6926ac'}}>
                {hotelId.typeHotel}{' '}{hotelId.nameHotel}
            </div>
            <div style={{fontWeight: 200, fontSize: 17}}>
                {hotelId.descriptionHotel}
            </div>
        </>
    )
}
export default DescriptionHotel