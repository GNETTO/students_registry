let Router = require("express").Router(); let models = require("../models/les_models");

Router.get("/", (req, res) => {
  res.render("acceuil")
});

Router.get("/emarger", (req, res) => {
  //console.log(Date.now())
  res.render("emarger", { geoLoc: false })
});


Router.post("/emarger", (req, res) => {

  // VERIFIER UTILISATEUR
  models.student_model.findOne({ code_access: req.body.code_access }, (err, current_user) => {
    if (err) return res.end('Une erreur est apparue');
    if (!current_user) return res.end('Votre code d" access est erroné');
    console.log('UTILISATEUR VERIFIER')
    // PRENDRE LA FEUILLE
    let y = (new Date()).getFullYear()
    let m = (new Date()).getMonth() + 1;
    let d = (new Date()).getDate();
    d = d.toString();
    if (d.length == 1) {
      d = "0" + d
    }
    //let today = `${(new Date()).getFullYear()}-${(new Date()).getMonth() + 1}-${(new Date()).getDate()}`; console.log(today)

    let today = `${y}-${m}-${d}`; console.log(today)

    models.sheet_model.findOne({ dte_registre: today }, (err, current_sheet) => {
      //console.log(current_sheet, new Date(Date.now()));
      console.log(current_sheet)
      //res.redirect("/administration")
      console.log('FEUILLE VERIFIER')
      //res.end('sheet')
      //verif user dans bd
      models.registre_model.findOne({ student: current_user.id, sheet: current_sheet }, (err, current_registre) => {
        if (err) return res.end('Une erreur est apparue lors de la verification utilisateur');
        console
        if (!current_registre) {
          // arriver 
          console.log('UTILISATEUR ARRIVER')

          res.redirect("/arrivee/" + current_user.id + "/" + current_sheet.id)
        } else {
          console.log('UTILISATEUR DEPART')
          res.redirect("/depart/" + current_user.id + "/" + current_sheet.id)
        }
      })
    })

  })

});


Router.get("/arrivee/:id/:sheet", (req, res) => {
  models.student_model.findOne({ _id: req.params.id }, (err, current_user) => {
    res.render("arrivee", { student: current_user })
  })

});

Router.post("/arrivee/:id/:sheet", (req, res) => {

  new_registre = new models.registre_model();
  new_registre.ha = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
  new_registre.hd = '';
  new_registre.student = req.params.id;
  new_registre.sheet = req.params.sheet
  new_registre.save((err, doc) => {

    //res.render("arrivee", { student: req.params.id })
    models.student_model.findOne({ _id: req.params.id }, (err, current_user) => {
      res.render("arrivee", { student: current_user })
    })
    console.log('Registre arrivée ')
  })

});

Router.get("/depart/:id/:sheet", (req, res) => {

  models.student_model.findOne({ _id: req.params.id }, (err, current_user) => {
    res.render("depart", { student: current_user })
  })
});

Router.post("/depart/:id/:sheet", (req, res) => {
  models.registre_model.findOne({ student: req.params.id, sheet: req.params.sheet }, (err, registre) => {
    registre.hd = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
    console.log(registre)
    models.registre_model.findOneAndUpdate({ student: req.params.id, sheet: req.params.sheet }, registre, (err, updated_registre) => {
      console.log('REGISTRE UPDATED ');
      //console.log(updated_registre);
      models.student_model.findOne({ _id: req.params.id }, (err, current_user) => {
        res.render("depart", { student: current_user })
      })
      //res.render("depart", { student: req.params.id })
    })

  })

});


module.exports = Router;

/*
db.students.insertOne( { item: "card", qty: 15 } )
*/