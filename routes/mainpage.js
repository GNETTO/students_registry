let Router = require("express").Router();
let models = require("../models/les_models");

Router.get("/", (req, res) => {
    res.render("acceuil")
});

Router.get("/emarger", (req, res) => {
    //console.log(Date.now())
    res.render("emarger", { geoLoc: false })
});

Router.post("/emarger", (req, res) => {
    // console.log(req.body.code_access)
    dte_jour = new Date(Date.now());
    //console.log(dte_jour)

    // VERIFIER UTILISATEUR
    models.student_model.findOne({ code_access: req.body.code_access }, (err, current_user) => {
        if (err) return res.end('Une erreur est apparue');
        if (!current_user) return res.end('Votre code d" access est erroné');

        // PRENDRE LA FEUILLE
        models.sheet_model.findOne({ dte_registre: '2021-11-29T00:00:01.000Z' }, (err, current_sheet) => {
            //console.log(current_sheet, new Date(Date.now()));
            console.log(current_sheet)
            //res.redirect("/administration")

            res.end('sheet')
        })

    })

});

/*
[
  {
    _id: new ObjectId("61a0f486605b93211aa4ff78"),
    dte_registre: 2021-11-25T00:00:00.000Z,
    __v: 0
  },
  {
    _id: new ObjectId("61a0f8a0cd30a9b99cb9c75f"),
    dte_registre: 2021-11-27T00:00:00.000Z,
    __v: 0
  },
  {
    _id: new ObjectId("61a1607c7c8deb8afdab8873"),
    dte_registre: 2021-11-27T00:00:00.000Z,
    __v: 0
  },
  {
    _id: new ObjectId("61a493dfcd1510a88bb81a35"),
    dte_registre: 2021-11-29T00:00:00.000Z,
    __v: 0
  }
]

*/
Router.get("/h_arrive/:times", (req, res) => {
    res.render("arriver", { geoLoc: false })
});

Router.get("/h_depart/:times", (req, res) => {
    res.render("depart", { geoLoc: false })
});



module.exports = Router;

/*
db.students.insertOne( { item: "card", qty: 15 } )
*/