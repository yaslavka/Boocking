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
const GeoControllers = require('./src/Controllers/GeoControllers')
const RecommendedControllers = require('./src/Controllers/RecommendedControllers')
const HotelControllers = require('./src/Controllers/HotelControllers')


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

app.get('/api/cities', GeoControllers.geoCities)
app.use('/api/all_cities', GeoControllers.allCities)
app.use('/api/recommended', RecommendedControllers.recommended)
app.use('/api/actions', RecommendedControllers.actions)
app.use('/api/hotel_id', HotelControllers.hotelId)
app.use('/api/citi_id', HotelControllers.citiId)
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(80, () => console.log(`server started on port 80`));
    //httpsServer.listen(443, () => console.log(`server started on port 443`));
  }catch (error){
    console.log(error);
  }
}
start().then(r=>r);