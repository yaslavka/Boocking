import React, {createRef, useState} from 'react';
import styles from '../ListHotel/listHotel.module.scss';
import Slider from 'react-slick';

function NumberLists({item}) {
  const [description, setDescription] = useState(false);
  const sliderRef = createRef();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  function PrevArrow(props) {
    const {className, onClick} = props;
    return (
      <button className={`${className} ${styles.sliderLeftArrow}`} type='button' onClick={onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' width='78' height='78' viewBox='0 0 78 78' fill='none'>
          <circle cx='39' cy='27' r='15' fill='#2F5FE3' />
          <path d='M37 23L41 27L37 31' stroke='white' />
        </svg>
      </button>
    );
  }
  function NextArrow(props) {
    const {className, onClick} = props;
    return (
      <button className={`${className} ${styles.sliderRightArrow}`} type='button' onClick={onClick}>
        <svg xmlns='http://www.w3.org/2000/svg' width='78' height='78' viewBox='0 0 78 78' fill='none'>
          <circle cx='39' cy='27' r='15' fill='#2F5FE3' />
          <path d='M37 23L41 27L37 31' stroke='white' />
        </svg>
      </button>
    );
  }
  return (
    <div className={styles.table}>
      <div className={styles.tbody}>
        <div className={styles.toggleRoomDescription} onClick={()=>setDescription(!description)}>
          <div>Описание и фото</div>
          <div className={description ? 'fa fa-arrow-up': 'fa fa-arrow-down'} aria-hidden="true"/>
        </div>
        <div className={styles.toggleRoomDescription2}>
                    Количество комнат {item.rooms}
        </div>
        <div className={styles.toggleRoomDescription2}>
                    Спальных мест {item.count}
        </div>
      </div>
      {description && (
        <>
          <div className={styles.hotelDescription}>
            {item.albumNumber?.length > 0 && (
              <>
                <div className={styles.hotelAlbumContainer}>
                  <section className={styles.albumPhoto}>
                    <Slider {...settings} ref={sliderRef}>
                      {item.albumNumber.map((img, index)=>(
                        <img key={index} src={img.albumNumber}
                          alt={img.albumHotel} className={styles.albumHotel}
                          width={500} height={300}
                        />
                      ))}
                    </Slider>
                  </section>
                </div>
              </>
            )}
            {item.descriptionNumber && (
              <li className={styles.descriptionHotel}>{item.descriptionNumber}</li>
            )}
          </div>
        </>
      )}
    </div>
  );
}
export default NumberLists;
