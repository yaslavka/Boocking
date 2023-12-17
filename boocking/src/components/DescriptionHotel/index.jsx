import React from "react";

function DescriptionHotel({hotelId, number, numberId}) {
    return (
        <>
            {number ? (
                <>
                    <div style={{fontWeight: 800, fontSize: 30, color: '#6926ac'}}>
                        {numberId.nameNumber}{' '}{numberId.typeNumber}
                    </div>
                    <div style={{fontWeight: 200, fontSize: 17}}>
                        {numberId.descriptionNumber}
                    </div>
                </>
            ):(
                <>
                    <div style={{fontWeight: 800, fontSize: 30, color: '#6926ac'}}>
                        {hotelId.typeHotel}{' '}{hotelId.nameHotel}
                    </div>
                    <div style={{fontWeight: 200, fontSize: 17}}>
                        {hotelId.descriptionHotel}
                    </div>
                </>
            )}
        </>
    )
}
export default DescriptionHotel