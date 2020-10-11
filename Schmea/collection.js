var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var JSONSchema = new Schema({
    created_at: Date,
    updated_at: Date,
    json: Object
});
 let CollectionName = "CSV"+(Math.round(Math.random()*2)+Date.now());

 module.exports=mongoose.model('JSON', JSONSchema,CollectionName);