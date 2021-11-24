let Router = require("express").Router();

let modelUser = require("../models/users.js");
let modelConection = require("../models/connection.js");
const connection = require("../models/connection.js");

Router.get("/", (req, res) => {

    res.render("homepage", { emargement: false });
});

Router.post("/", (req, res) => {
    let presence_date = new Date(Date.now()).toLocaleDateString("en-US")

    console.log(req.body);
    modelUser.findOne({ cd_access: req.body.c_access }, (err, current_user) => {
        if (!current_user) return res.end('Votre code d" access est erroné');
        console.log('hello');
        modelConection.find({ id: '20' }, (err, connect) => {
            console.log(connect)
        });
    })

    //console.log(current_user);

    //check for if user has has registered

    /* then(connect => {
         console.log(connect);
         if (connect) return res.end("Vous avez deja emargé");
         console.log("EMARGEMMMMM");
         let new_connection = new modelConection(
             {
                 user: current_user._id,
                 c_date: presence_date,
                 is_connected: true,
                 at: "10:50:52"
             }
         );*/

    /* new_connection.save().
     then(c => {
         console.log("CONNECTION SAVED");
         if (!c) return console.log("reason userno added ");
         //console.log(c)
         return res.render("homepage", { emargement: true });
     }).
     catch(err => {
         return console.log(err)
     })*/
    /*})
    return res.render("homepage", { emargement: true });
}).catch(failure => {
    return res.end('Un erreur est apparue lors de la verification de votre identite');
})*/

    //res.render("homepage");
})



module.exports = Router;