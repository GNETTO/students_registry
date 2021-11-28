let Router = require("express").Router();
let models = require("../models/les_models");

Router.get("/", (req, res) => {
    res.render("acceuil")
});

Router.get("/emarger", (req, res) => {
    res.render("emarger", { geoLoc: false })
});

Router.post("/emarger", (req, res) => {
    // console.log(req.body.code_access)
    dte_jour = new Date(Date.now());
    console.log(dte_jour)

    /* models.student_model.findOne({ code_access: req.body.code_access }, (err, current_user) => {
         if (err) return res.end('Une erreur est apparue');
         if (!current_user) return res.end('Votre code d" access est erroné');
 
         console.log(current_user, { geoLoc: true });
         res.redirect("/administration")
     })*/
    res.render("emarger", { geoLoc: false })
});

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