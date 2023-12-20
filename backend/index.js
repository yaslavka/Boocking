const axios = require('axios')

require("dotenv").config();
//const fs = require("fs");
const http = require("http");
const express = require("express");
const app = express();
const sequelize = require("./db");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const multer = require("multer");
const SocketServer = require('./utils/socketStart')
const UserControllers = require('./src/Controllers/UserControllers')
const GeoControllers = require('./src/Controllers/GeoControllers')
const RecommendedControllers = require('./src/Controllers/RecommendedControllers')
const HotelControllers = require('./src/Controllers/HotelControllers')
const NumberControllers = require('./src/Controllers/NumberControllers')
const ReservationControllers = require('./src/Controllers/ReservationControllers')
const FavoritesControllers = require('./src/Controllers/FavoritesControllers')
const { AlbumNumbers } = require('./src/models/AllbumNumbers')
const { NumbersModels } = require('./src/models/NumbersModels')
//const { AlbumHotel } = require('./src/models/AllbumHotel')
//const { HotelModals } = require('./src/models/HotelModals')


const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './files/images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/images", express.static(path.resolve(__dirname, "files", "images")));
app.use("/api/sites/", express.static(path.resolve(__dirname, "clientsites")));
const server = http.createServer(app);
require('./utils/io.js').init(server);
const io = require('./utils/io.js').get();

app.post('/api/inviter', UserControllers.inviter)
app.post('/api/login', UserControllers.login)
app.post('/api/register', UserControllers.register)
app.get('/api/user', UserControllers.user)
app.get('/api/cities', GeoControllers.geoCities)
app.get('/api/all_cities', GeoControllers.allCities)
app.get('/api/recommended', RecommendedControllers.recommended)
app.get('/api/actions', RecommendedControllers.actions)
app.get('/api/hotel_id', HotelControllers.hotelId)
app.get('/api/citi_id', HotelControllers.citiId)
app.post('/api/upload_mages_hotel', upload.single('file'), HotelControllers.uploadImagesHotel)
app.get('/api/number_id', NumberControllers.numberId)
app.get('/api/reservation', ReservationControllers.reservation)
app.get('/api/reservation_manager', ReservationControllers.reservationManager)
app.post('/api/reservation_info', ReservationControllers.reservationInfo)
app.get('/api/reservation_id', ReservationControllers.reservationId)
app.post('/api/reservation_book', ReservationControllers.reservationBook)
app.get('/api/all_favorites', FavoritesControllers.allFavorites)
app.post('/api/add_favorites', FavoritesControllers.addToFavorites)
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    io.on("connection",  async socket => {
      await SocketServer(socket, io)
    })
    server.listen(80, () => console.log(`server started on port 80`));
    //httpsServer.listen(443, () => console.log(`server started on port 443`));
    const response = await axios.get('https://hotel.tutu.ru/offers/api/roomOffers?geoId=7649628&checkInDate=2023-12-29&checkOutDate=2023-12-30&guestsList[]=%7B%22adultCount%22:1,%22childrenList%22:[]%7D&isBusinessTrip=false&searchId=475201ed-880e-477d-b09a-e21a3db4b67f&token=&tariffsId=&tariffsGroupId=&priceCurrency=&priceAmount=&detailsQueryParams=a%3D2&timeZone=%2B0300')
    // if (response.data.roomOffers.length > 0){
    //   response.data.roomOffers.map(async (item)=>{
    //     const id = await NumbersModels.create({
    //       nameNumber:item.roomContent.roomName,
    //       typeNumber:item.roomContent.roomName,
    //       rooms: 1,
    //       descriptionNumber:item.roomContent.description,
    //       imageNumber:item.roomContent.imagesList[0].x500,
    //       hotelId:7,
    //       price: 1900
    //     })
    //     item.roomContent.imagesList.map(async img=>{
    //       await AlbumNumbers.create({
    //         albumNumber: img.x1024,
    //         numberId:id?.id,
    //       })
    //     })
    //   })
    // }

  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);