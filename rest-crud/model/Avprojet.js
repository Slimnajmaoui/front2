const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
let Affprojet = new Schema({
  nom: { type: String },
  description: { type: String },
  datedebut: { type: String },
  datefin: { type: String },
  etat: { type: String },
  avancement: { type: String },
  datecreation: { type: String },
  datemodification: { type: String }


}, {
  collection: 'affprojets'
})
  
module.exports = mongoose.model('Affprojet', Affprojet)