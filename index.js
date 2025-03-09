const express = require("express");
const bodyParser = require("body-parser");
const mogoose = require("mongoose");
const cors = require('cors');
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())
app.use(require("./routes/index"));

app.listen(process.env.PORT, (error) => {
  if (error) console.log(error);
  console.log(`Running on port ${process.env.PORT}`);
});

const connectToDb = async () => {
  try {
    await mogoose.connect(process.env.MONGO_URI);
    console.log(`connected to ${process.env.MONGO_URI}`);
  } catch (error) {
    console.log(error);
  }
};

connectToDb();


app.get('/' , (req, resp) => {
  return resp.status(200).json({ok: true});
})