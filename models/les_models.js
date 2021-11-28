// create a model for students
const mongoose = require("../node_modules/mongoose");

const Schema = mongoose.Schema;

//partenaire model
const partenaire_schema = new Schema(
    {

        intitule: { type: String },
        type_partenaire: { type: String }

    }
);

//formation model
const formation_schema = new Schema(
    {

        intitule: { type: String },
        description: { type: String },
        illustration: { type: String }

    }
);

//offre formation
const offre_formation_schema = new Schema(
    {

        intitule: { type: String },
        description: { type: String },
        place: { type: Number },
        debut: { type: Date },
        fin_prevu: { type: Date },
        fin_reel: { type: Date },
        echeance: { type: Number },
        partenaires: [
            {
                nom: { type: Schema.Types.ObjectId, ref: 'partenaires' }
            }
        ],
        formation: { type: Schema.Types.ObjectId, ref: 'formations' }
    }
);

//coache
const coache_schema = new Schema(
    {

        nom: { type: String },
        prenoms: { type: String },
        domaine: { enum: ['Developer IA', 'Referent digital', 'Developer Web Mobile'] }

    }
);

//enrolement

const inscription_schema = new Schema(
    {

        intutile: { type: String },
        identifiant: { type: String },
        student: { type: Schema.Types.ObjectId, ref: 'students' },
        inscris_le: { type: Date },
        offre: { type: Schema.Types.ObjectId, ref: 'offre_formations' }

    }
);

//student
const student_schema = new Schema(
    {

        nom: { type: String },
        prenoms: { type: String },
        code_access: { type: String },
        email: { type: String },
        habitation: { type: String },
        phone: { type: String },
        file: { type: String }

    }
);

/*nom: '',
  prenoms: '',
  habitation: '',
  email: '',
  phone: '',
  file: '
  */
//registre
const sheet_schema = new Schema(
    {

        dte_registre: { type: Date, unique: true }
    }
);

// registre
const registre_schema = new Schema(
    {

        ha: { type: String },
        hd: { type: String },
        code_access: { type: String },
        student: { type: Schema.Types.ObjectId, ref: 'students' }

    }
);

const setting_schema = new Schema(
    {
        sheet_auto_generation: { type: Boolean },
        display_registre: { type: Boolean },
        xxx: { type: Boolean }
    }
)
let models = {};
models.formation_model = mongoose.model('formation', formation_schema);
models.student_model = mongoose.model('student', student_schema);
models.partenaire_model = mongoose.model('partenaire', partenaire_schema);
models.coache_model = mongoose.model('coach', coache_schema);
models.inscription_model = mongoose.model('inscription', inscription_schema);
models.offre_formation_model = mongoose.model('offre_formation', offre_formation_schema);

models.sheet_model = mongoose.model('sheet', sheet_schema);
models.registre_model = mongoose.model('registre', registre_schema);

models.setting_model = mongoose.model('setting', setting_schema);
module.exports = models;


/*db.students.insertOne( { nom: 'Gneto', prenoms: 'dominique', code_access:'a' } );*/