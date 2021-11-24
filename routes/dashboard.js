
let Router = require("express").Router();
let models = require("../models/les_models"); console.log(models)

let dict_action = {
    ajouter: 'INSCRIPTION',
    modification: 'MODIFICATION',
    suppression: 'SUPPRESSION'
};
let fake_data_apprenant = {
    id: '',
    nom: '',
    prenoms: '',
    email: '',
    habitation: '',
    phone: '',
    file: '',

}

let fake_data_formation = {

    intitule: '',
    description: '',
    illustration: ''

};

let fake_data_tb_registre = {

}


Router.get("/", (req, res) => {
    res.render('admin')
});


Router.get("/liste_apprenants", (req, res) => {
    models.student_model.find({}, (err, current_user) => {
        if (err) return res.end('Une erreur est apparue');
        if (!current_user) return res.end('Votre code d" access est erroné');
        //console.log(current_user)
        //console.log(current_user, { geoLoc: true });
        res.render('list_apprenant', { apprenant: current_user })
    })

});

Router.get("/apprenant/ajouter", (req, res) => {
    p_action = dict_action[req.params.action];

    res.render('form_apprenants', { action: 'AJOUTER', apprenant: fake_data_apprenant })
});



Router.post("/apprenant/ajouter", (req, res) => {
    let apprenant = req.body; //console.log(appre)
    apprenant.code_access = 'a';
    new_test = new models.student_model(apprenant);

    new_test.save((err, doc) => {
        res.render('form_apprenants', { action: 'AJOUTER', apprenant: doc })
    });


});

Router.get("/apprenant/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_apprenants', { apprenant: current_user, action: 'MODIFIER' })
    })

});

Router.post("/apprenant/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findByIdAndUpdate(req.params.id, req.body, (err, current_user) => {
        console.log(current_user)
        res.render('form_apprenants', { apprenant: req.body, action: 'MODIFIER' })
    })

});


Router.get("/apprenant/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_apprenants', { apprenant: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/apprenant/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_apprenants', { apprenant: req.body, action: 'SUPPRESSION' })
    })

});



// FROMATION

Router.get("/formations", (req, res) => {
    models.formation_model.find({}, (err, all_formation) => {
        if (err) return res.end('Une erreur est apparue');
        //if (!current_user) return res.end('Votre code d" access est erroné');
        //console.log(current_user)
        //console.log(current_user, { geoLoc: true });
        res.render('formations', { formations: all_formation })
    })

});

Router.get("/formations/ajouter", (req, res) => {

    res.render('form_formations', { action: 'AJOUTER', formation: fake_data_formation })
});

Router.post("/formations/ajouter", (req, res) => {
    let formations = req.body; //console.log(appre)
    new_test = new models.formation_model(formations);

    new_test.save((err, doc) => {
        res.render('form_formations', { action: 'AJOUTER', formation: doc })
    });


});

Router.get("/formations/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formations', { formation: current_user, action: 'MODIFIER' })
    })

});

Router.post("/formations/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findByIdAndUpdate(req.params.id, req.body, (err, current_user) => {
        console.log(current_user)
        res.render('form_formations', { formation: req.body, action: 'MODIFIER' })
    })

});


Router.get("/formations/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formations', { formation: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/formations/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formations', { formations: req.body, action: 'SUPPRESSION' })
    })

});




/// REGISTRE


Router.get("/registre", (req, res) => {
    models.tb_registre_model.find({}, (err, all_tb_registre) => {
        if (err) return res.end('Une erreur est apparue');

        res.render('registre', { registre: all_tb_registre })
    })

});

Router.get("/registre/ajouter", (req, res) => {

    res.render('form_registre', { action: 'AJOUTER', tb_registre: fake_data_tb_registre })
});

Router.post("/registre/ajouter", (req, res) => {
    let registre = req.body; //console.log(appre)
    new_test = new models.tb_registre_model(registre);

    new_test.save((err, doc) => {
        res.render('form_registre', { action: 'AJOUTER', tb_registre: doc })
    });


});

Router.get("/registre/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.tb_registre_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { tb_registre: current_user, action: 'MODIFIER' })
    })

});

Router.post("/registre/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.tb_registre_model.findByIdAndUpdate(req.params.id, req.body, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { tb_registre: req.body, action: 'MODIFIER' })
    })

});


Router.get("/registre/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.tb_registre_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { tb_registre: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/registre/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.tb_registre_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { registre: req.body, action: 'SUPPRESSION' })
    })

});

module.exports = Router;