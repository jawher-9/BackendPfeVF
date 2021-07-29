const Event = require("../models/eventModel");
const Comment = require("../models/commentModel");
module.exports = {
  CreateEvent: async (req, res) => {
    const eventObj = {
      title: req.body.title,
      content: req.body.content,
      phone: req.body.phone
    };
    eventObj.id_author = req.user._id;

    console.log(eventObj);
    Event.create(eventObj)
      .then((createdEvent) => {
        Event.findById(createdEvent.id)
          .then((event) => {
            res.status(200).json({
              success: true,
              message: "Event added successfully.",
              data: event,
            });
          })
          .catch((err) => {
            console.log(err);
            let message = "Skusaa neshto";
            return res.status(401).json({
              success: false,
              message: message,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        let message = "Something went wrong :( Check the form for errors.";
        return res.status(401).json({
          success: false,
          message: message + err,
        });
      });
  },

  EditEvent: async (req, res) => {
    const eventId = req.params.id;
    let event = await Event.findById(eventId);
    if (req.user._id.toString() === event.id_author.toString()) {
      const eventObj = req.body;
      eventObj.id_author = req.user._id;
      
      Event.findById(eventId)
        .then((existingEvent) => {
          existingEvent.title = eventObj.title;
          existingEvent.content = eventObj.content;
          existingEvent.phone = eventObj.phone;
          existingEvent
            .save()
            .then((editedEvent) => {
              Event.findById(editedEvent._id)
                .populate("comments")
                .then((event) => {
                  res.status(200).json({
                    success: true,
                    message: "Event diteed successfully.",
                    data: event,
                  });
                })
                .catch((err) => {
                  console.log(err);
                  let message = "Skusa neshto";
                  return res.status(401).json({
                    success: false,
                    message: message,
                  });
                });
            })
            .catch((err) => {
              console.log(err);
              let message =
                "Something went wrong1 :( Check the form for errors.";
              return res.status(401).json({
                success: false,
                message: message,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          const message = "Something went wrong2 :( Check the form for errors.";
          return res.status(401).json({
            success: false,
            message: message,
          });
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
  },
  GetAllEvent: async (req, res) => {
    Event.find()
      .populate({
        path: "comments",
        populate: {
          path: "id_creator",
        },
      })
      .populate("id_author")
      .then((events) => {
        res.status(200).json(events);
      });
  },
  DeleteEvent: async (req, res) => {
    const eventId = req.params.id;
    let event = await Event.findById(eventId);
    if (req.user._id.toString() === event.id_author.toString()) {
      let eventComments = event.comments;
      for (let id of eventComments) {
        await Comment.findById(id).remove();
      }
      Event.findById(eventId)
        .then((event) => {
          event.remove().then(() => {
            return res.status(200).json({
              success: true,
              message: "Event deleted successfully!",
            });
          });
        })
        .catch(() => {
          return res.status(401).json({
            success: false,
            message: "Entry does not exist!",
          });
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials!",
      });
    }
  },
};
