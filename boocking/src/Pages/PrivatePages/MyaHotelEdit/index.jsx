import React, {useCallback, useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import PrivateNavbar from "../../../components/PrivateNavbar";
import {Formik, Form} from "formik";
import styles from './myHotelEdit.module.scss'
import {useParams} from "react-router-dom";
import * as hotelIdActions from "../../../actions/hotelId.actions";
import TextInput from "../../../components/TextInput";


function MyaHotelEdit() {
    const dispatch =useDispatch()
    const {id} = useParams()
    const hotelId = useSelector((state) => state.hotelId.hotelId)
    const [active, setActive]=useState(hotelId && hotelId.active)
    const [imageHotel, setImageHotel]=useState(null)
    const [image, setImage]=useState(null)
    const [wifi, setWifi]=useState(hotelId && hotelId.wifi)
    const [breakfast, setBreakfast]=useState(hotelId && hotelId.wifi)
    const [swimmingPool, setSwimmingPool]=useState(hotelId && hotelId.swimmingPool)
    const [latitude, setLatitude]=useState(hotelId && hotelId.latitude)
    const [longitude, setLongitude]=useState(hotelId && hotelId.longitude)
    const [address, setAddress]=useState(hotelId && hotelId.address)
    const [pay, setPay]=useState(hotelId && hotelId.pay)

    useEffect(()=>{
        if (imageHotel !== null){
            dispatch(hotelIdActions.uploadImages({imageHotel:imageHotel, id:id}))
        }
    },[imageHotel, dispatch, id])

    useEffect(()=>{
        dispatch(hotelIdActions.hotelId(id))
    },[dispatch, id])

    const initialValues = useMemo(
        () => ({
            nameHotel:'',
            requisitesPay:'',
            phonePay:'',
            discount:null,
            phone:'',
            email:'',
            price:'',
            NumberOfRooms:null,
            distanceTo:null,
            distanceOut:null,
            distanceCenter:null,
            distanceRailwayStation:null,
            typeHotel:'',
            typeOfRooms:'',
            descriptionHotel:'',
            geoCityId: null,
        }),
        [],
    )

    const onSubmit =useCallback((credentials)=>{
       dispatch(hotelIdActions.hotelIdEdit({
           nameHotel:credentials.nameHotel || hotelId?.nameHotel,
           requisitesPay:credentials.requisitesPay || hotelId?.requisitesPay,
           phonePay:credentials.phonePay || hotelId?.phonePay,
           wifi:wifi,
           breakfast:breakfast,
           swimmingPool:swimmingPool,
           discount:credentials.discount || hotelId?.discount,
           latitude:latitude,
           longitude:longitude,
           address:address,
           phone:credentials.phone || hotelId?.phone,
           email:credentials.email || hotelId?.email,
           bal: hotelId?.bal,
           price:credentials.price || hotelId?.price,
           NumberOfRooms:credentials.NumberOfRooms || hotelId?.NumberOfRooms,
           rating:hotelId?.rating,
           distanceTo:credentials.distanceTo || hotelId?.distanceTo,
           distanceOut:credentials.distanceOut || hotelId?.distanceOut,
           distanceCenter:credentials.distanceCenter || hotelId?.distanceCenter,
           distanceRailwayStation:credentials.distanceRailwayStation || hotelId?.distanceRailwayStation,
           typeHotel:credentials.typeHotel || hotelId?.typeHotel,
           typeOfRooms:credentials.typeOfRooms || hotelId?.typeOfRooms,
           descriptionHotel:credentials.descriptionHotel || hotelId?.descriptionHotel,
           active:active,
           pay:pay,
           geoCityId: credentials.geoCityId || hotelId?.geoCityId,
       }))
    },[
        dispatch,
        hotelId?.nameHotel,
        hotelId?.requisitesPay,
        wifi, breakfast, hotelId?.discount,
        latitude, longitude, address,
        hotelId?.phone, hotelId?.email,
        hotelId?.bal,hotelId?.price,
        hotelId?.NumberOfRooms,
        hotelId?.rating,
        hotelId?.distanceTo,
        hotelId?.distanceOut,
        hotelId?.distanceCenter,
        hotelId?.distanceRailwayStation,
        hotelId?.typeHotel,
        hotelId?.typeOfRooms,
        hotelId?.descriptionHotel,
        active,pay,
        hotelId?.geoCityId
    ])
    return (
        <PrivateNavbar>
            {hotelId && (
               <>
                   <h5 className={styles.title}>
                       Редактирование {hotelId.nameHotel}
                   </h5>
                   <div className={styles.imagesWrapper}>
                       <div>
                           <div className={styles.imagesWrapperTitle}>
                               <p className="css-1pyrx33"
                                  style={{fontWeight: 400, fontSize: 'calc(1.142rem)', textTransform: 'none', textAlign: "center"}}>
                                   Выберите изображение
                               </p>
                           </div>
                           <div className={styles.imagesWrapperUpload}>
                               <div className={styles.imagesContainer}>
                                   <div className={styles.images} onClick={() => document.querySelector(".input-upload-img").click()}>
                                       {image ? (
                                           <img src={image} alt={image} height={'auto'} width={300}/>
                                       ):(
                                           <img src={hotelId.imageHotel ? `${process.env.REACT_APP_BASE_AVATAR_URL}/${hotelId.imageHotel}` : 'https://www.w3schools.com/howto/img_avatar.png'} alt={''} height={'auto'} width={300}/>
                                       )}
                                   </div>
                                   <input
                                       hidden
                                       type={'file'}
                                       accept="image/*"
                                       className="input-upload-img"
                                       onChange={({target: {files}})=>{
                                           if (files){
                                               setImage(URL.createObjectURL(files[0]))
                                               setImageHotel(files[0])
                                           }
                                       }}/>
                               </div>
                           </div>
                       </div>
                   </div>
                   <Formik initialValues={initialValues} onSubmit={onSubmit}>
                       {()=>(
                           <Form>
                               <TextInput
                                   name="nameHotel"
                                   title={'Имя Отеля'}
                                   subTitle={hotelId.nameHotel}
                               />
                               <TextInput
                                   name="requisitesPay"
                                   title={'Платежные реквизиты'}
                                   subTitle={hotelId.requisitesPay}
                               />
                               <TextInput
                                   name="phonePay"
                                   title={'Телефон для оплат'}
                                   subTitle={hotelId.phonePay}
                               />
                           </Form>
                       )}
                   </Formik>
               </>
            )}
        </PrivateNavbar>
    )
}
export default MyaHotelEdit