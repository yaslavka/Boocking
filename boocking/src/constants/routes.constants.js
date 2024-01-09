const routesLik = Object.freeze({
  root: '/',
  hotelId: '/hotel/:id',
  citiesId: '/search_hotel_home/:id',
  allCities: '/all_city',
  numbersId: '/number/:id',
  dashboard: '/dashboard',
  hotelAdd: '/hotel_add',
  hotelEit: '/hotel_edit',
  hotelEitId: '/hotel_edit/:id',
  myHotel: '/my_hotel',
  myHotelAddNumber: '/my_hotel/add_number',
  myHotelAddNumberEdit: '/my_hotel/add_number-edit',
  myHotelAddNumberEditId: '/my_hotel/number-edit/:id',
  myHotelAllNumber: '/my_hotel/all_number',
  reservation: '/reservation/:id',
  mySites: '/my-sites',
  addSites: '/edit/new-template',
  chat: '/chat',
  chatId: '/chat/:id',
  helpChat: '/help-chat',
  helpChatId: '/help-chat/:id',
  myReservation: '/my-reservation',
  favorites: '/favorites',
  negative: '/negative',
  users: '/users',
  profileEdit: '/profile-edit',
  review: '/review',
  wallet: '/wallet',
})
export default routesLik
