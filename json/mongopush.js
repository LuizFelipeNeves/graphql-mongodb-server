require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect(process.env.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true
});
const Location = require("./Location");

const municipios = JSON.parse(fs.readFileSync("src/final.json"));

municipios.map(e =>
  Location.create(e, (err, small) => {
    if (err) return console.error(err);
    console.log(e.city);
  })
);