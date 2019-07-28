require("dotenv").config();

const fs = require("fs");
const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;

mongoose.connect(process.env.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true
});
const Loc = require("./Loc");

const municipios = JSON.parse(fs.readFileSync("src/final.json"));

municipios.map(e =>
  Loc.create(e, (err, small) => {
    if (err) return console.error(err);
    console.log(e.cidade);
  })
);
