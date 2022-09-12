const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cors = require("cors");
const helmet = require("helmet");
const nodemailer = require("nodemailer");
const { Schema, model } = mongoose;

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/umat_venue_booking_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

const eventSchema = new Schema({
  title: String,
  date: Date,
  location: String,
  duration: Number,
  contact_person: String,
  phone_no: String,
  email: String,
  additional_info: String,
});

const Event = model("Event", eventSchema);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mquarcoo@kehillahglobal.com",
    pass: process.env.PASSWORD,
  },
});

app.get("/events", (req, res) => {
  try {
    Event.find({}, (err, events) => {
      res.send({
        success: true,
        events,
      });
    });
  } catch (error) {
    res.send({
      success: false,
      error,
    });
  }
});

app.post("/events", (req, res) => {
  try {
    const event = new Event({
      title: req.body.title,
      date: req.body.date,
      location: req.body.location,
      duration: req.body.duration,
      contact_person: req.body.contact_person,
      phone_no: req.body.phone_no,
      email: req.body.email,
      additional_info: req.body.additional_info,
    });

    // Send email
    const mailOptions = {
      from: "mquarcoo@kehillahglobal.com",
      to: "michaelquarcoo04@gmail.com, " + event.email,
      subject: `Venue Booking request for ${location}`,
      html: `<div>
              <h1>Venue Booking Request</h1> 
              <br /> 
              <h3>Event Details</h3>
              <p>Event Name: ${event.title}</p>
              <p>Date: ${new Date(event.date).toDateString()}</p>
              <p>Time: ${new Date(event.date).toTimeString()}</p>
              <p>Duration: ${event.duration} hours</p>
              <p>
                Additional Information: $
                {event.additional_info ? event.additional_info : "None"}
              </p>
              <br />
              <br />
              <h3>Contact Details</h3>
              <p>Name: ${event.contact_person}</p>
              <p>Phone Number: ${event.phone_no}</p>
              <p>Email Address: ${event.email}</p>
            </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({
          success: false,
          error,
        });
        return;
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    event.save((err) => {
      if (err) {
        res.send({
          success: false,
          event,
          error: err,
        });
      } else {
        res.send({
          success: true,
          event,
        });
      }
    });
  } catch (error) {
    res.send({
      success: false,
      error,
    });
  }
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
