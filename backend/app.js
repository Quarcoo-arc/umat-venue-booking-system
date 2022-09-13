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
  is_student: Boolean,
  index_no: String,
  is_approved: Boolean,
  is_disapproved: Boolean,
});

const Event = model("Event", eventSchema);

app.get("/events", (req, res) => {
  try {
    Event.find({}, (err, events) => {
      const events_count = events.length;
      const requested_events = [];
      const approved_events = [];
      const disapproved_events = [];

      events.forEach((event) => {
        if (event.is_approved) {
          approved_events.push(event);
        } else if (!event.is_approved && !event.is_disapproved) {
          requested_events.push(event);
        } else {
          disapproved_events.push(event);
        }
      });

      res.send({
        success: true,
        no_of_events: events_count,
        no_of_approved_events: approved_events.length,
        no_of_requested_events: requested_events.length,
        no_of_disapproved_events: disapproved_events.length,
        requested_events,
        approved_events,
        disapproved_events,
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

app.get("/events/approved", (req, res) => {
  try {
    Event.find({ is_approved: true }, (err, events) => {
      if (err) {
        res.send({
          success: false,
          error: err,
        });
      } else {
        res.send({
          succes: true,
          events,
        });
      }
    });
  } catch (error) {
    res.send({
      succes: false,
      error,
    });
  }
});

app.get("/events/disapproved", (req, res) => {
  try {
    Event.find({ is_approved: false, is_disapproved: true }, (err, events) => {
      if (err) {
        res.send({
          success: false,
          error: err,
        });
      } else {
        res.send({
          succes: true,
          events,
        });
      }
    });
  } catch (error) {
    res.send({
      succes: false,
      error,
    });
  }
});

app.get("/events/requests", (req, res) => {
  try {
    Event.find({ is_approved: false, is_disapproved: false }, (err, events) => {
      if (err) {
        res.send({
          success: false,
          error: err,
        });
      } else {
        res.send({
          succes: true,
          events,
        });
      }
    });
  } catch (error) {
    res.send({
      succes: false,
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
      is_student: req.body.is_student,
      index_no: req.body.index_no,
      is_approved: false,
      is_disapproved: false,
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "mquarcoo@kehillahglobal.com",
      to: "michaelquarcoo04@gmail.com, " + event.email,
      subject: `Venue Booking request for ${event.location}`,
      html: `<div>
              <h1>Venue Booking Request</h1> 
              <br /> 
              <h3>Event Details</h3>
              <p>Event Name: ${event.title}</p>
              <p>Date: ${new Date(event.date).toDateString()}</p>
              <p>Time: ${new Date(event.date).toTimeString()}</p>
              <p>Duration: ${event.duration} hours</p>
              <p>
                Additional Information: ${
                  event.additional_info ? event.additional_info : "None"
                }
              </p>
              <br />
              <br />
              <h3>Contact Details</h3>
              <p>Name: ${event.contact_person}</p>
              <p>Phone Number: ${event.phone_no}</p>
              <p>Email Address: ${event.email}</p>
              <p>Status: ${event.is_student ? "Student" : "Non-student"}</p>
              <p>${
                event.is_student ? "Index Number: " + event.index_no : ""
              }</p>
            </div>`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.send({
          success: false,
          error,
          message: "Failed to send email",
        });
        return;
      } else {
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
