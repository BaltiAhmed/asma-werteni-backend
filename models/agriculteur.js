const mongoose =require("mongoose")
const schema = mongoose.Schema;

const agriculteurSchema = new schema({
    nom:{type:String,required:true},
    prenom:{type:String,required:true},
    datenaissa:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true,minlenght:8},
    telephone:{type:String,required:true,minlenght:8},
    adresse:{type:String,required:true},
    reclamations:[{ type: mongoose.Types.ObjectId, required: true, ref: "reclamation" }],
    demandeDiagnostique:[{ type: mongoose.Types.ObjectId, required: true, ref: "demandeDiagnostique" }]

})


module.exports = mongoose.model('agriculteur',agriculteurSchema)