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
    models.student_model.findOne({ code_access: req.body.code_access }, (err, current_user) => {
        if (err) return res.end('Une erreur est apparue');
        if (!current_user) return res.end('Votre code d" access est erroné');

        console.log(current_user, { geoLoc: true });
        res.redirect("/administration")
    })

});

module.exports = Router;

/*
db.students.insertOne( { item: "card", qty: 15 } )
*/