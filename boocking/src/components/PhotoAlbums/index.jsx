import React, {createRef} from "react";
import Slider from "react-slick";

function PhotoAlbums({hotelId}) {
    const sliderRef = createRef();
    const settings = {
        customPaging: function(i) {
            return (
                <a>
                    {hotelId.albumHotel.map((item, index)=>(
                        <>
                            {index === i && (
                                <img key={i +1} src={`${process.env.REACT_APP_BASE_AVATAR_URL}/${item.albumHotel}`} alt={item.albumHotel} height={100}/>
                            )}
                        </>
                    ))}
                </a>
            );
        },

        dots: true,
        dotsClass: "slick-dots",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return(
        <>
            {hotelId.albumHotel?.length > 0 && (
                <Slider {...settings} ref={sliderRef}>
                    {hotelId.albumHotel.map((item, index)=>(
                        <img src={`${process.env.REACT_APP_BASE_AVATAR_URL}/${item.albumHotel}`} alt={item.albumHotel} height={500}/>
                    ))}
                </Slider>
            )}
        </>
    )
}
export default PhotoAlbums