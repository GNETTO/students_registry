const mongoose = require("../node_modules/mongoose");

const Schema = mongoose.Schema;

const Connection = new Schema(
    {

        user: { type: Schema.Types.ObjectId, ref: 'Connection' },
        c_date: { type: Date },
        is_connected: { type: Boolean },
        at: { type: String }

    }
);


module.exports = mongoose.model('connection', Connection);

/*db.Connection.insertOne({
    userName: "GNETO",
    Connectionurname: "TIERO DOMINIQUE MARTIAL",
    cd_access: "acs",
    contact: "0757633987",
    stat: "student"
})*/