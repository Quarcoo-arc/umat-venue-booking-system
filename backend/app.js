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
  additional_info: String,
});

const Event = model("Event", eventSchema);

app.get("/events", (req, res) => {
  Event.find({}, (err, events) => {
    res.send({
      success: true,
      events,
    });
  });
});

app.post("/events", (req, res) => {
  // TODO: Change event items to req.body.<param_name>
  const event = new Event({
    ...req.body,
  });

  event.save((err) => {
    if (err) {
      res.send({
        success: false,
        event,
      });
    } else {
      res.send({
        success: true,
        event,
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
