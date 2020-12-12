const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GttySchema = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: String },
    role: { type: String },
});
module.exports = GttySchema
