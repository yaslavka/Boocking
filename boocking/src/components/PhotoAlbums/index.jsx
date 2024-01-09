import React, { createRef } from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

function PhotoAlbums({ hotelId, number, numberId }) {
  const sliderRef = createRef()
  const settings = {
    customPaging: function (i) {
      return (
        <Link to={'#'}>
          {number ? (
            <>
              {numberId &&
                numberId?.albumNumber?.map((item, index) => {
                  return (
                    <>
                      {index === i && (
                        <img
                          key={index}
                          src={item.albumNumber}
                          alt={item.albumNumber}
                          height={100}
                        />
                      )}
                    </>
                  )
                })}
            </>
          ) : (
            <>
              {hotelId &&
                hotelId?.albumHotel?.map((item, index) => (
                  <>
                    {index === i && (
                      <img
                        key={index}
                        src={item.albumHotel}
                        alt={item.albumHotel}
                        height={100}
                      />
                    )}
                  </>
                ))}
            </>
          )}
        </Link>
      )
    },

    dots: true,
    dotsClass: 'slick-dots',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <>
      {number ? (
        <>
          {numberId && numberId.albumNumber?.length > 0 && (
            <Slider {...settings} ref={sliderRef}>
              {numberId.albumNumber.map((item, index) => (
                <img
                  key={index}
                  src={item.albumNumber}
                  alt={item.albumNumber}
                  height={500}
                />
              ))}
            </Slider>
          )}
        </>
      ) : (
        <>
          {hotelId.albumHotel?.length > 0 && (
            <Slider {...settings} ref={sliderRef}>
              {hotelId.albumHotel.map((item, index) => (
                <img
                  key={index}
                  src={item.albumHotel}
                  alt={item.albumHotel}
                  height={500}
                />
              ))}
            </Slider>
          )}
        </>
      )}
    </>
  )
}
export default PhotoAlbums
