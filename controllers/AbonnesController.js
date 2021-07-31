const Abonne = require("../models/abonnesModel");
module.exports = {
  CreateAbonne: function (req, res) {
    const newabonne = {
      id_user: req.user._id,
    };
    Abonne.create(newabonne, (err, abonne) => {
      if (err)
        res.status(500).json({
          message: err,
          statut: 500,
        });
      else
        res.status(200).json({
          message: "abonne added",
          statut: 200,
          date: abonne,
        });
    });
  },
  GetALLAbonne: function (req, res) {
    Abonne.find({}).populate('id_user').populate('abonnes').exec((err, listabonne) => {
      if (err)
        res.status(500).json({
          message: err,
          statut: 500,
        });
      else
        res.status(200).json({
          message: "abonne founded",
          statut: 200,
          date: listabonne,
        });
    });
  },
  GetAbonneByUser: function (req, res) {
    console.log("id", req.params.id);
    Abonne.findById({ id_user: req.params.id }).exec((err, abonne) => {
      if (err)
        res.status(500).json({
          message: err,
          statut: 500,
        });
      else
        res.status(200).json({
          message: "abonne found by id",
          statut: 200,
          date: abonne,
        });
    });
  },
  DeleteAbonne: function (req, res) {
    Abonne.deleteOne({ _id: req.params.id }).exec((err, abonne) => {
      if (err)
        res.status(500).json({
          message: err,
          statut: 500,
        });
      else
        res.status(200).json({
          message: "abonne deleted",
          statut: 200,
          date: abonne,
        });
    });
  },
  pushAbonnee: function (req, res) {
    Abonne.updateOne(
      { $or:[
        {id_user: req.user._id}, 
    
       { abonnes: { $nin: [ req.body.id_abonne ]}}
    
    ] },
      { $push: { abonnes: req.body.id_abonne } },
      function (err, abonnee) {
        if (err) {
          res.json({ message: "error", status: 500, data: null });
        } else {
          res.json({
            message: "abonnee is pushed",
            status: 200,
            data: abonnee,
          });
        }
      }
    );
  },
  pullAbonnee: function (req, res) {
    Abonne.updateOne(
      { id_user: req.user.id },
      { $pull: { abonnes: req.body.id_abonne } },
      function (err, abonnee) {
        if (err) {
          res.json({ message: "error", status: 500, data: null });
        } else {
          res.json({
            message: "abonnee is removed from order",
            status: 200,
            data: abonnee,
          });
        }
      }
    );
  },
};
