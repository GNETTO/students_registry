Router.get("/formations", (req, res) => {
    res.render('formations')
});

Router.get("/formations/ajouter", (req, res) => {
    p_action = dict_action[req.params.action];

    res.render('form_formationss', { action: 'AJOUTER' })
});

Router.post("/formations/ajouter", (req, res) => {
    let formations = req.body; //console.log(appre)
    new_test = new models.formation_model(formations);

    new_test.save((err, doc) => {
        //console.log(doc)
    });

    res.render('form_formationss', { action: 'AJOUTER' })
});

Router.get("/formations/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formationss', { formations: current_user, action: 'MODIFIER' })
    })

});

Router.post("/formations/modifier/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findByIdAndUpdate(req.params.id, req.body, (err, current_user) => {
        console.log(current_user)
        res.render('form_formationss', { formations: req.body, action: 'MODIFIER' })
    })

});


Router.get("/formations/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findById(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formationss', { formations: current_user, action: 'SUPPRESSION' })
    })

});

Router.post("/formations/supprimer/:id", (req, res) => {
    //console.log(req.params.id)
    models.formation_model.findByIdAndRemove(req.params.id, (err, current_user) => {
        console.log(current_user)
        res.render('form_formationss', { formations: req.body, action: 'SUPPRESSION' })
    })

});

#{ forma.intitule }