let Router = require("express").Router();let models = require("../models/les_models");

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
        let today =  `${(new Date()).getFullYear()}-${(new Date()).getMonth()+1}-${(new Date()).getDate()}`; console.log(today)
        
        
        models.sheet_model.findOne({ dte_registre: today }, (err, current_sheet) => {
            //console.log(current_sheet, new Date(Date.now()));
            console.log(current_sheet)
            //res.redirect("/administration")
            console.log('FEUILLE VERIFIER')
            //res.end('sheet')
            //verif user dans bd
            models.registre_model.findOne({ student: current_user.id, sheet:current_sheet }, (err, current_registre) => {
                if(err) return res.end('Une erreur est apparue lors de la verification utilisateur');
                console
                if(!current_registre) {
                  // arriver 
                  console.log('UTILISATEUR ARRIVER')
                   res.redirect("/arrivee/"+current_user.id+"/"+current_sheet.id)
                }else{
                  console.log('UTILISATEUR DEPART')
                   res.redirect("/depart/"+current_user.id+"/"+current_sheet.id)
                }
            })
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
Router.get("/arrivee/:id/:sheet", (req, res) => {
  
    res.render("arrivee", { student: req.params.id })
});

Router.post("/arrivee/:id/:sheet", (req, res) => {

  new_registre = new models.registre_model();
  new_registre.ha = `${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
  new_registre.hd = '';
  new_registre.student= req.params.id;
  new_registre.sheet = req.params.sheet
  new_registre.save((err, doc) => {
    
    res.render("arrivee", { student: req.params.id })
    
    console.log('Registre arrivée ')
  })
  
});
/** ha: { type: String },
        hadate:{type:Date},
        hd: { type: String },
        hddtate:{type:Date},
        code_access: { type: String },
        student: { type: Schema.Types.ObjectId, ref: 'students' },
        sheet: { type: Schema.Types.ObjectId, ref: 'sheets' } ²*/
Router.get("/depart/:id/:sheet", (req, res) => {
    res.render("depart", { student: req.params.id })
});

Router.post("/depart/:id/:sheet", (req, res) => {
  models.registre_model.findOne({ student: req.params.id, sheet:req.params.sheet }, (err, registre) => {
    registre.hd=`${(new Date()).getHours()}:${(new Date()).getMinutes()}:${(new Date()).getSeconds()}`
    console.log(registre)
    models.registre_model.findOneAndUpdate({ student: req.params.id, sheet:req.params.sheet },registre, (err, updated_registre) =>{
        console.log('REGISTRE UPDATED ');
        //console.log(updated_registre);
        res.render("depart", { student: req.params.id })
    })
    
})
  
});


module.exports = Router;

/*
db.students.insertOne( { item: "card", qty: 15 } )
*/