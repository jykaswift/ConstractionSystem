require("dotenv").config();
const express = require("express");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const sequelize = require("./db");
const fs = require("fs");


// Сертификаты для HTTPS
const key = fs.readFileSync("./privatekey.pem");
const cert = fs.readFileSync("./publiccert.pem");

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_DOMAIN,
  })
);


app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
app.use(errorHandler);

app.get('/download/:id', (req, res) => {
  try {
    // const file = `docs/${req.params.id}.pdf`;
    const file = `docs/doc.pdf`;
    res.download(file);
  } catch (err) {
    res.status(500).json()
    console.log(err);
  }
})



const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(process.env.SERVER_PORT, (err) => {
        if (err) {
          return console.log(err);
        }
      });
  } catch (e) {
    console.log(e);
  }
};
start();


module.exports = {
  app
}