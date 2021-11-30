
let Router = require("express").Router();
let models = require("../models/les_models"); console.log(models)
let async = require("async");
const { model } = require("mongoose");

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

let fake_sheet = {
    dte_registre: ''
}

//AIzaSyBh5-0H2UCy8omtHLZD_ogUTtT6hKDBVpU

function all_students(cb) {

    models.student_model.find({}, cb);
}


function all_formations(cb) {
    models.formation_model.find({}, cb);
}

function all_sheets(cb) {
    models.sheet_model.find({}, cb);
}

function all_partenaires(cb) {
    models.partenaire_model.find({}, cb);
}



models.sheet_model.find({}, (err, sheets) => {

});

models.partenaire_model.find({}, (err, partenaires) => {

});

Router.all("/*", (req, res, next) => {
    //console.log(settings);
    next();
})

Router.use("/", (req, res, next) => {

    next();
})
Router.get("/", (req, res) => {
    async.parallel(
        {
            students: all_students,
            formations: all_formations,
            sheets: all_sheets,
            partenaires: all_partenaires
        },
        (err, resultat) => {
            console.log(resultat.students.length)

            res.render('admin',
                { total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
        }
    )

});


Router.get("/liste_apprenants", (req, res) => {
    models.student_model.find({}, (err, current_user) => {
        if (err) return res.end('Une erreur est apparue');
        if (!current_user) return res.end('Votre code d" access est erroné');
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                console.log(resultat.students.length)

                res.render('list_apprenant',
                    { apprenant: current_user, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            }
        )
        /// res.render('list_apprenant', { apprenant: current_user })
    })

});

Router.get("/apprenant/ajouter", (req, res) => {
    p_action = dict_action[req.params.action];
    async.parallel(
        {
            students: all_students,
            formations: all_formations,
            sheets: all_sheets,
            partenaires: all_partenaires
        },
        (err, resultat) => {
            //console.log(resultat.students.length)
            res.render('form_apprenants',
                { action: 'AJOUTER', apprenant: fake_data_apprenant, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
        })

});



Router.post("/apprenant/ajouter", (req, res) => {
    let apprenant = req.body; //console.log(appre)
    apprenant.code_access = 'a';
    new_test = new models.student_model(apprenant);

    new_test.save((err, doc) => {
        async.parallel(
            {
                students: all_students,
                formations: all_formations
            },
            (err, resultat) => {
                console.log(resultat.students.length)

                //res.render('admin', { total_total: resultat.students.length })
                res.render('form_apprenants', { action: 'AJOUTER', apprenant: doc, total_total: resultat.students.length })
            }
        )

    });


});

Router.get("/apprenant/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findById(req.params.id, (err, current_user) => {
        //console.log(current_user)
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_apprenants',
                    { apprenant: current_user, action: 'MODIFIER', total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_apprenants', { apprenant: current_user, action: 'MODIFIER' })
    })

});

Router.post("/apprenant/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    let upadat = req.body;
    upadat.code_access = 'a';
    models.student_model.findByIdAndUpdate(req.params.id, upadat, (err, current_user) => {
        //console.log(current_user)
        res.render('form_apprenants', { apprenant: req.body, action: 'MODIFIER' })
    })

});


Router.get("/apprenant/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findById(req.params.id, (err, current_user) => {
        //console.log(current_user)
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_apprenants',
                    { apprenant: current_user, action: 'SUPPRESSION', total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_apprenants', { apprenant: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/apprenant/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.student_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        //console.log(current_user)
        res.render('form_apprenants', { apprenant: req.body, action: 'SUPPRESSION' })
    })

});



// FROMATION

Router.get("/formations", (req, res) => {
    models.formation_model.find({}, (err, all_formation) => {
        if (err) return res.end('Une erreur est apparue');
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('formations',
                    { formations: all_formation, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('formations', { formations: all_formation })
    })

});

Router.get("/formations/ajouter", (req, res) => {
    async.parallel(
        {
            students: all_students,
            formations: all_formations,
            sheets: all_sheets,
            partenaires: all_partenaires
        },
        (err, resultat) => {
            //console.log(resultat.students.length)
            res.render('form_formations',
                { action: 'AJOUTER', formation: fake_data_formation, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
        })

    //res.render('form_formations', { action: 'AJOUTER', formation: fake_data_formation })
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
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_formations',
                    { action: 'MODIFIER', formation: current_user, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_formations', { formation: current_user, action: 'MODIFIER' })
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
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_formations',
                    { formation: current_user, action: 'SUPPRESSION', total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_formations', { formation: current_user, action: 'SUPPRESSION' })
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
    models.sheet_model.find({}, (err, all_tb_registre) => {
        if (err) return res.end('Une erreur est apparue');
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('registre',
                    { registre: all_tb_registre, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('registre', { registre: all_tb_registre })
    })

});

Router.get("/registre/ajouter", (req, res) => {
    async.parallel(
        {
            students: all_students,
            formations: all_formations,
            sheets: all_sheets,
            partenaires: all_partenaires
        },
        (err, resultat) => {
            //console.log(resultat.students.length)
            res.render('form_registre',
                { action: 'CREER', tb_registre: fake_sheet, total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
        })
    //res.render('form_registre', { action: 'CREER', tb_registre: fake_sheet })
});

Router.post("/registre/ajouter", (req, res) => {
    let format = new Date(req.body.dte_registre) ; console.log(format)
    
    let registre = req.body; //console.log(appre)
    //new_test = new models.sheet_model(registre);
    new_test = new models.sheet_model({dte_registre:new Date()});
    //console.log(new_test)
    
    new_test.save((err, doc) => {
        //res.render('form_registre', { action: 'CREER', tb_registre: doc }); VRAI
        res.render('form_registre', { action: 'CREER',tb_registre: fake_sheet})
        console.log('OKKKK ')
    })

    //res.render('form_registre', { action: 'CREER',tb_registre: fake_sheet})

});

Router.get("/registre/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.sheet_model.findById(req.params.id, (err, current_user) => {
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_registre',
                    { tb_registre: current_user, action: 'MODIFIER', total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_registre', { tb_registre: current_user, action: 'MODIFIER' })
    })

});

Router.post("/registre/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.sheet_model.findByIdAndUpdate(req.params.id, req.body, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { tb_registre: req.body, action: 'MODIFIER' })
    })

});


Router.get("/registre/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.sheet_model.findById(req.params.id, (err, current_user) => {
        async.parallel(
            {
                students: all_students,
                formations: all_formations,
                sheets: all_sheets,
                partenaires: all_partenaires
            },
            (err, resultat) => {
                //console.log(resultat.students.length)
                res.render('form_registre',
                    { tb_registre: current_user, action: 'SUPPRESSION', total_student: resultat.students.length, total_formation: resultat.formations.length, total_sheet: resultat.sheets.length, total_partenaire: resultat.partenaires.length })
            })
        //res.render('form_registre', { tb_registre: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/registre/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.sheet_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_registre', { registre: req.body, action: 'SUPPRESSION' })
    })

});



//PARAMETRE
Router.get('/configurations', (req, res) => {
    //console.log("DEMARRAGE ...");
    models.setting_model.find({}, (err, settings) => {
        //console.log(settings)
        settings = settings[0]; //console.log(settings)
        let keys = Object.keys(settings);

        res.render('configuration')
    })

})

Router.get('/config_data', (req, res) => {
    models.setting_model.find({}, (err, settings) => {
        //console.log(settings)
        settings = settings[0]; //console.log(settings)
        res.json(settings)
    })
})
//61a3e566fe5c3f7748f1eb19
//findById(req.params.id, (err, current_user)
Router.post('/config_data', (req, res) => {
    console.log(req.body)
    models.setting_model.findByIdAndUpdate('61a3e566fe5c3f7748f1eb19', req.body, (err, new_settings) => {
        console.log(new_settings)
        //settings = new_settings[0]; //console.log(settings)
        res.json(new_settings)
    })

})

module.exports = Router;