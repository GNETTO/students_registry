let Router = require("express").Router();

const mongoose = require("../node_modules/mongoose");

const Schema = mongoose.Schema;

const test = new Schema(
    {

        na: { type: String },
        sna: { type: String },
        dte: { type: Date },

        hr: { type: String }

    }
);
let models = mongoose.model('test', test);

/*test.virtual('concat_noms').get(function () {
    return this.civ + " " + this.userName + " " + this.testurname;
})*/



Router.get("/", (req, res) => {

    models.find().
        exec((err, data) => {
            res.render("tpage", { d: data })
            console.log(data)
        })
    //console.log(model)
    //res.end("TEST DB")
});

Router.get("/a", (req, res) => {
    new_test = new models(
        {
            na: 'gneto',
            sna: 'domi',
            dte: '2002-12-09',
            hr: '00-02-00'
        }
    );

    new_test.save((err, doc) => {
        console.log(doc)
    });
    //console.log(model)
    res.end("TEST DB")
});

Router.get("/u/:id", (req, res) => {
    models.findById(req.params.id, (err, doc) => {
        res.render("update", { d: doc })
        console.log(doc)
    })
});

Router.post("/u/:id", (req, res) => {
    let updates = req.body; console.log(updates)

    models.findByIdAndUpdate(req.params.id, updates, {}, function (err, user) {
        //console.log(user);
        // console.log(user);
        res.render("update", { d: user })
    });
    /*models.findAndUpdate(req.params.id, (err, doc) => {

    })*/
});
//        req.params.id
module.exports = Router;