require("dotenv").config();
//const fs = require("fs");
const moment = require('moment')
const http = require("http");
//const https = require("https");
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
const PayControllers = require('./src/Controllers/PayControllers')
const { NumbersModels } = require('./src/models/NumbersModels')

// const privateKey = fs.readFileSync(
//   "/etc/letsencrypt/live/my-backend.ru/privkey.pem",
//   "utf8"
// );
// const certificate = fs.readFileSync(
//   "/etc/letsencrypt/live/my-backend.ru/cert.pem",
//   "utf8"
// );
// const ca = fs.readFileSync(
//   "/etc/letsencrypt/live/my-backend.ru/chain.pem",
//   "utf8"
// );
//
//
// const credentials = {
//   key: privateKey,
//   cert: certificate,
//   ca: ca,
// };

const storage = multer.diskStorage({
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});
const upload = multer({ storage });
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/images", express.static(path.resolve(__dirname, "files", "images")));
app.use("/api/sites/", express.static(path.resolve(__dirname, "clientsites")));
const server = http.createServer(app);
//const httpsServer = https.createServer(credentials, app);
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
app.get('/api/object', HotelControllers.myObject)
app.post('/api/hotel_add', HotelControllers.myObjectAdd)
app.post('/api/hotel_edit', HotelControllers.hotelEdit)
app.post('/api/upload_mages_hotel', upload.single('file'), HotelControllers.uploadImagesHotel)
app.post('/api/upload_album_hotel', upload.array('images'), HotelControllers.uploadAlbumImagesHotel)
app.get('/api/number_id', NumberControllers.numberId)
app.get('/api/number_manager', NumberControllers.numbersManager)
app.post('/api/number_edit', NumberControllers.numberEdit)
app.post('/api/number_add', NumberControllers.numberAdd)
app.post('/api/number_manager_image', upload.single('file'), NumberControllers.uploadImageNumber)
app.post('/api/number_manager_album', upload.array('images'), NumberControllers.uploadAlbumNumber)
app.get('/api/reservation', ReservationControllers.reservation)
app.get('/api/reservation_manager', ReservationControllers.reservationManager)
app.post('/api/reservation_info', ReservationControllers.reservationInfo)
app.get('/api/reservation_id', ReservationControllers.reservationId)
app.post('/api/reservation_book', ReservationControllers.reservationBook)
app.post('/api/reservation_cancel', ReservationControllers.reservationCancel)
app.get('/api/all_favorites', FavoritesControllers.allFavorites)
app.post('/api/add_favorites', FavoritesControllers.addToFavorites)
app.get('/api/pay-history', PayControllers.payHistory)
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    io.on("connection",  async socket => {
      await SocketServer(socket, io)
    })
    server.listen(80, () => console.log(`server started on port 80`));
    //httpsServer.listen(443, () => console.log(`server started on port 443`));
    const allRecords = await NumbersModels.findAll();

    const updates = allRecords.map((record) => {
      const startOfDay = moment(record.startDate);
      const endDate = moment(record.startDate).add(24, 'hours');

      return NumbersModels.update(
        {
          startDate: startOfDay.format('DD MMM YYYY').replace(/\s[APMapm]{2}$/, ''),
          endDates: endDate.format('DD MMM YYYY').replace(/\s[APMapm]{2}$/, '')
        },
        { where: { id: record.id } }
      );
    });

    // Дождитесь завершения всех обновлений
    await Promise.all(updates);
  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);
