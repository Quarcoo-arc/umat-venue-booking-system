const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

mongoose.connect("mongodb://localhost:27017/umat_venue_booking_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const eventSchema = new Schema({
  title: String,
  date: Date,
  location: String,
  time: Date,
  duration: Number,
  contact_person: String,
  phone_no: String,
  email: String,
});

const Event = model("Event", eventSchema);

app.get("/events", (req, res) => {
  Event.find({}, (err, events) => {
    res.send({
      events,
    });
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
