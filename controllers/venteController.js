const Vente = require("../models/venteModel");
const Comment = require("../models/venteModel");
module.exports = {
  CreateVente: async (req, res) => {
    const venteObj = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      phone: req.body.phone,
      image: req.file.filename,
    };
    venteObj.id_author = req.user._id;
    console.log(venteObj);
    Vente.create(venteObj)
      .then((createdVente) => {
        Vente.findById(createdVente.id)
          .then((vente) => {
            res.status(200).json({
              success: true,
              message: "Vente added successfully.",
              data: vente,
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
  EditVente: async (req, res) => {
    const venteId = req.params.id;
    let vente = await Vente.findById(venteId);
    if (req.user._id.toString() === vente.id_author.toString()) {
      const venteObj = req.body;

      venteObj.id_author = req.user._id;
      Vente.findById(venteId)
        .then((existingVente) => {
          existingVente.title = venteObj.title;
          existingVente.description = venteObj.description;
          existingVente.price = venteObj.price;
          existingVente.phone = venteObj.phone;
          existingVente
            .save()
            .then((editedVente) => {
              Vente.findById(editedVente._id)
                .populate("comments")
                .then((vente) => {
                  res.status(200).json({
                    success: true,
                    message: "Vente edited successfully.",
                    data: vente,
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
                "Something went wrong :( Check the form for errors.";
              return res.status(401).json({
                success: false,
                message: message,
              });
            });
        })
        .catch((err) => {
          console.log(err);
          const message = "Something went wrong :( Check the form for errors.";
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
  GetAllVente: async (req, res) => {
    Vente.find()
      .populate({
        path: "comments",
        populate: {
          path: "id_creator",
        },
      })
      .populate("id_author")
      .then((ventes) => {
        res.status(200).json(ventes);
      });
  },
  DeleteVente: async (req, res) => {
    const venteId = req.params.id;
    let vente = await Vente.findById(venteId);
    if (req.user._id.toString() === vente.id_author.toString()) {
      let venteComments = vente.comments;
      for (let id of venteComments) {
        await Comment.findById(id).remove();
      }
      Vente.findById(venteId)
        .then((vente) => {
          vente.remove().then(() => {
            return res.status(200).json({
              success: true,
              message: "Vente deleted successfully!",
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
