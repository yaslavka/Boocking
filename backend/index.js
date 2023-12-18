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
  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);